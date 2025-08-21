"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ServerSkeleton } from "@/components/skeletons/ServerSkeleton"
import { toast } from "react-toastify"
import { ServerType, OrderType } from "@/types" // Asegúrate de tener este tipo definido


interface DashboardProps {
  initialServers: ServerType[]
  pendingOrders?: OrderType[]
}

export default function DashboardClient({ initialServers, pendingOrders = [] }: DashboardProps) {
  // Mapear los pedidos a "servidores pendientes"
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

  useEffect(() => {
    // SSE connection
    const eventSource = new EventSource(`/api/server/stream?orderId=${pendingServers[0].id}`) // tu endpoint SSE

    eventSource.onmessage = (event) => {
      const data: ServerType = JSON.parse(event.data)
      setServers((prev) =>
        prev.map((s) => (s.id === data.id ? { ...s, ...data, pending: false } : s))
      )
      toast.success(`Server ${data.name} is ready!`)
    }

    eventSource.onerror = (err) => {
      console.error("SSE error:", err)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [])

  return (
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
            </div>

            {server.status === 'pending' ? (
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
  )
}
