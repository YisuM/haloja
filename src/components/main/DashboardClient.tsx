"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ServerSkeleton } from "@/components/skeletons/ServerSkeleton"
import { toast } from "react-toastify"
import { ServerType, OrderType } from "@/types"

// Tipos para los eventos de Motia
interface MotiaServerEvent {
  type: 'server.provisioning' | 'server.installing' | 'server.ready' | 'server.failed'
  data: {
    orderId: string
    status?: string
    progress?: number
    server?: {
      id: string
      name: string
      cpu: string
      memory: string
      region: string
      status: string
      public_ip: string
      date_string: string
    }
    error?: string
  }
}

interface DashboardProps {
  initialServers: ServerType[]
  pendingOrders?: OrderType[]
  initialOrderId?: string // Para casos donde llegamos desde /dashboard?orderId=...
}

export default function DashboardClient({ 
  initialServers, 
  pendingOrders = [],
  initialOrderId 
}: DashboardProps) {
  
  // Mapear los pedidos a "servidores pendientes" - mantengo tu lógica exacta
  const pendingServers: ServerType[] = pendingOrders.map((order) => ({
    id: order.id,
    name: order.typeOfServer,
    cpu: "-",        // todavía no disponible
    memory: "-",
    region: "-",
    status: order.status,
    public_ip: "-",
    date_string: new Date(order.requestAt).toLocaleString(),
    icon: "file.svg",
    pending: true,
  }))

  const [servers, setServers] = useState<ServerType[]>([...pendingServers, ...initialServers])
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected')

  useEffect(() => {
    // Solo conectar si tenemos pedidos pendientes o un orderId específico
    const hasOrdersToTrack = pendingServers.length > 0 || initialOrderId
    
    if (!hasOrdersToTrack) {
      return
    }

    let eventSource: EventSource | null = null
    
    const connectToMotia = () => {
      setConnectionStatus('connecting')
      
      // Construir URL con orderIds que queremos trackear
      const orderIds = initialOrderId 
        ? [initialOrderId] 
        : pendingServers.map(s => s.id)
      
      const queryParams = new URLSearchParams()
      orderIds.forEach(id => queryParams.append('orderId', id))
      
      // Endpoint de Motia para streaming (reemplaza tu SSE endpoint)
      eventSource = new EventSource(`/api/motia/stream?${queryParams.toString()}`)

      eventSource.onopen = () => {
        setConnectionStatus('connected')
        console.log('✅ Connected to Motia stream')
      }

      eventSource.onmessage = (event) => {
        try {
          const motiaEvent: MotiaServerEvent = JSON.parse(event.data)
          handleMotiaEvent(motiaEvent)
        } catch (error) {
          console.error('❌ Error parsing Motia event:', error)
        }
      }

      eventSource.onerror = (err) => {
        console.error('❌ Motia stream error:', err)
        setConnectionStatus('disconnected')
        
        // Reconectar después de 3 segundos
        setTimeout(() => {
          if (eventSource?.readyState === EventSource.CLOSED) {
            connectToMotia()
          }
        }, 3000)
      }
    }

    // Función para manejar eventos de Motia
    const handleMotiaEvent = (event: MotiaServerEvent) => {
      const { type, data } = event
      
      console.log('📡 Motia event received:', type, data)
      
      switch (type) {
        case 'server.provisioning':
          // Actualizar estado a "deploying"
          setServers(prev => 
            prev.map(server => 
              server.id === data.orderId 
                ? { ...server, status: 'deploying' }
                : server
            )
          )
          toast.info(`Provisioning server... ${data.progress || 0}%`)
          break

        case 'server.installing':
          // Actualizar progreso de instalación
          toast.info(`Installing WordPress... ${data.progress || 0}%`)
          break

        case 'server.ready':
          // Server completado - reemplazar skeleton con datos reales
          if (data.server) {
            setServers(prev => 
              prev.map(server => 
                server.id === data.orderId 
                  ? {
                      ...server,
                      id: data.server!.id,
                      name: data.server!.name,
                      cpu: data.server!.cpu,
                      memory: data.server!.memory,
                      region: data.server!.region,
                      status: data.server!.status,
                      public_ip: data.server!.public_ip,
                      date_string: data.server!.date_string,
                      pending: false
                    }
                  : server
              )
            )
            toast.success(`🎉 Server ${data.server.name} is ready!`)
          }
          break

        case 'server.failed':
          // Manejar fallos
          setServers(prev => 
            prev.map(server => 
              server.id === data.orderId 
                ? { ...server, status: 'failed', pending: false }
                : server
            )
          )
          toast.error(`❌ Server creation failed: ${data.error || 'Unknown error'}`)
          break

        default:
          console.warn('🤷‍♂️ Unknown Motia event type:', type)
      }
    }

    // Iniciar conexión
    connectToMotia()

    // Cleanup
    return () => {
      if (eventSource) {
        eventSource.close()
        setConnectionStatus('disconnected')
      }
    }
  }, [pendingServers.length, initialOrderId])

  return (
    <>
      {/* Indicador de conexión opcional (puedes quitarlo si no lo quieres) */}
      {connectionStatus === 'connecting' && (
        <div className="mb-4 p-2 bg-blue-100 dark:bg-blue-900 rounded text-sm">
          🔄 Connecting to server updates...
        </div>
      )}
      
      <section className="mt-8 grid grid-cols-1 gap-2 md:gap-4">
        <ul className="unstyled-list space-y-2">
          {servers.map((server) => (
            <li
              key={server.id}
              className="bg-slate-200 dark:bg-background p-4 rounded-lg shadow-md border border-slate-300 dark:border-slate-700 transition-colors"
            >
              <div className="flex items-center mb-3 relative">
                <Image
                  src={`${server.icon}`}
                  alt={server.name}
                  className="h-8 w-8 rounded-full border border-slate-300 dark:border-secondary-foreground"
                  width={32}
                  height={32}
                />
                <span className="font-semibold text-slate-400 dark:text-secondary-foreground ml-2">
                  {server.name}
                </span>
                
                {/* Indicador de estado para servidores pendientes */}
                {server.pending && (
                  <span className="ml-auto text-xs px-2 py-1 bg-yellow-200 dark:bg-yellow-800 rounded">
                    {server.status === 'deploying' ? '🚀 Deploying...' : '⏳ Pending...'}
                  </span>
                )}
              </div>

              {server.pending ? (
                <ServerSkeleton />
              ) : (
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  <span className="text-gray-700 dark:text-secondary-foreground">CPU: {server.cpu}</span>
                  <span className="text-gray-700 dark:text-secondary-foreground">Memory: {server.memory}</span>
                  <span className="text-gray-700 dark:text-secondary-foreground">Region: {server.region}</span>
                  <span className="text-gray-700 dark:text-secondary-foreground">Status: {server.status}</span>
                  <span className="text-gray-700 dark:text-secondary-foreground">Public IP: {server.public_ip}</span>
                  <span className="text-gray-700 dark:text-secondary-foreground">{server.date_string}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}