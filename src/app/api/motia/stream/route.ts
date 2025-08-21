// app/api/motia/stream/route.ts
import { NextRequest } from 'next/server'
import { getUser } from '@/dal/user/get-user'
import prisma from '@/lib/prisma'

// Simulación de respuesta de Motia/Lambda (reemplaza esto por Motia real)
const simulateWordPressCreation = async (orderId: string, typeOfServer: string) => {
  // Simular delay de 30 segundos total
  const totalTime = 30000
  const steps = [
    { event: 'server.provisioning', delay: 10000, progress: 30 },
    { event: 'server.installing', delay: 15000, progress: 70 },
    { event: 'server.ready', delay: 5000, progress: 100 }
  ]

  return new Promise<void>((resolve) => {
    let currentDelay = 0

    steps.forEach((step, index) => {
      setTimeout(async () => {
        try {
          // Emitir evento de progreso
          if (step.event === 'server.ready') {
            // Actualizar orden en DB cuando esté completado
            await prisma.orders.update({
              where: { id: orderId },
              data: { 
                status: 'completed'
              }
            })

            // Emitir evento final con datos del servidor
            const serverData = {
              id: `srv-${Date.now()}`,
              name: `${typeOfServer}-${orderId.slice(-4)}`,
              cpu: '0.5 vCPU',
              memory: '1 GB', 
              region: 'us-east-1',
              status: 'running',
              public_ip: `34.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
              date_string: new Date().toISOString()
            }

            // Esto se emitiría por Motia, aquí lo simulamos
            global.motiaEmitter?.emit('server.ready', {
              orderId,
              server: serverData,
              progress: 100
            })
          } else {
            // Eventos de progreso
            global.motiaEmitter?.emit(step.event, {
              orderId,
              status: step.event.replace('server.', ''),
              progress: step.progress
            })
          }

          if (index === steps.length - 1) {
            resolve()
          }
        } catch (error) {
          console.error(`Error in step ${step.event}:`, error)
          
          // Actualizar orden como fallida en DB
          try {
            await prisma.orders.update({
              where: { id: orderId },
              data: { status: 'failed' }
            })
          } catch (dbError) {
            console.error('Error updating failed order:', dbError)
          }
          
          global.motiaEmitter?.emit('server.failed', {
            orderId,
            error: error instanceof Error ? error.message : 'Unknown error'
          })
        }
      }, currentDelay + step.delay)

      currentDelay += step.delay
    })
  })
}

export async function GET(request: NextRequest) {
  // Verificar autenticación
  const user = await getUser()
  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Obtener orderIds desde query params
  const { searchParams } = new URL(request.url)
  const orderIds = searchParams.getAll('orderId')
  
  if (orderIds.length === 0) {
    return new Response('No orderIds provided', { status: 400 })
  }

  console.log('🔄 Starting Motia stream for orders:', orderIds)

  // Configurar SSE headers
  const headers = new Headers({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control'
  })

  // Crear ReadableStream para SSE
  const stream = new ReadableStream({
    start(controller) {
      // Función para enviar eventos SSE
      const sendSSEEvent = (data: any) => {
        const sseData = `data: ${JSON.stringify(data)}\n\n`
        controller.enqueue(new TextEncoder().encode(sseData))
      }

      // Configurar event emitter global (en producción usarías Motia)
      if (!global.motiaEmitter) {
        const { EventEmitter } = require('events')
        global.motiaEmitter = new EventEmitter()
      }

      // Listeners para cada tipo de evento
      const eventHandlers = {
        'server.provisioning': (data: any) => {
          if (orderIds.includes(data.orderId)) {
            sendSSEEvent({ type: 'server.provisioning', data })
          }
        },
        'server.installing': (data: any) => {
          if (orderIds.includes(data.orderId)) {
            sendSSEEvent({ type: 'server.installing', data })
          }
        },
        'server.ready': (data: any) => {
          if (orderIds.includes(data.orderId)) {
            sendSSEEvent({ type: 'server.ready', data })
          }
        },
        'server.failed': (data: any) => {
          if (orderIds.includes(data.orderId)) {
            sendSSEEvent({ type: 'server.failed', data })
          }
        }
      }

      // Registrar event listeners
      Object.entries(eventHandlers).forEach(([event, handler]) => {
        global.motiaEmitter.on(event, handler)
      })

      // Enviar evento de conexión exitosa
      sendSSEEvent({ 
        type: 'connection.established', 
        data: { message: 'Connected to Motia stream', orderIds } 
      })

      // Iniciar workflows para cada orden pendiente
      orderIds.forEach(async (orderId) => {
        try {
          // Obtener información de la orden
          const order = await prisma.orders.findUnique({
            where: { id: orderId, userId: user.id }, // Verificar que pertenece al usuario
            select: { id: true, typeOfServer: true, status: true }
          })

          if (!order) {
            console.warn(`Order ${orderId} not found or doesn't belong to user ${user.id}`)
            return
          }

          if (order.status !== 'pending') {
            console.warn(`Order ${orderId} is not pending (status: ${order.status})`)
            return
          }

          console.log(`🚀 Starting workflow for order ${orderId} (${order.typeOfServer})`)
          
          // Actualizar estado a "deploying"
          await prisma.orders.update({
            where: { id: orderId },
            data: { status: 'deploying' }
          })

          // Iniciar simulación (en producción, esto sería llamada a Motia)
          simulateWordPressCreation(orderId, order.typeOfServer)
            .catch(error => {
              console.error(`Workflow failed for order ${orderId}:`, error)
              global.motiaEmitter?.emit('server.failed', {
                orderId,
                error: error.message
              })
            })

        } catch (error) {
          console.error(`Error processing order ${orderId}:`, error)
          sendSSEEvent({ 
            type: 'server.failed', 
            data: { orderId, error: 'Failed to start workflow' }
          })
        }
      })

      // Heartbeat cada 30 segundos para mantener conexión viva
      const heartbeat = setInterval(() => {
        try {
          sendSSEEvent({ 
            type: 'heartbeat', 
            data: { timestamp: Date.now() } 
          })
        } catch (error) {
          clearInterval(heartbeat)
        }
      }, 30000)

      // Cleanup cuando se cierra la conexión
      request.signal?.addEventListener('abort', () => {
        console.log('🔌 Client disconnected from Motia stream')
        clearInterval(heartbeat)
        
        // Remover listeners
        Object.entries(eventHandlers).forEach(([event, handler]) => {
          global.motiaEmitter?.removeListener(event, handler)
        })
        
        controller.close()
      })
    }
  })

  return new Response(stream, { headers })
}

// Declarar tipo global para TypeScript
declare global {
  var motiaEmitter: any
}