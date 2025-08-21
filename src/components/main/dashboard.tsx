import { getUser } from "@/dal/user/get-user"
import prisma from "@/lib/prisma" // asumiendo que tienes Prisma configurado
import DashboardClient from "./DashboardClient"
import Link from "next/link"
import { ServerType, OrderType } from "@/types" // Asegúrate de tener este tipo definido

interface DashboardProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function Dashboard({ searchParams = {} }: DashboardProps) {
  // Obtener información del usuario
  const user = await getUser()
  if (!user) {
    throw new Error("User not found")
  }

  // Extraer orderId de los searchParams si existe
  const initialOrderId = typeof searchParams?.orderId === 'string' 
    ? searchParams.orderId 
    : undefined

  // Cargar servidores desde la base de datos (ejemplo)
  /* const initialServers: ServerType[] = await prisma.servers.findMany({
    where: { userId: user.id },
    select: {
      id: true,
      name: true,
      cpu: true,
      memory: true,
      region: true,
      status: true,
      public_ip: true,
      date_string: true,
      icon: true,
    },
  }) */

  const initialServers: ServerType[] = [{
    id: "001",
    name: "wordpress-test",
    cpu: "0.5 vCPU",
    memory: "1 GB",
    region: "us-east-1",
    status: "running",
    date_string: "2025-08-01T12:00:00Z",
    icon: "/icons/vercel.svg", // Asegúrate de tener un icono válido
    public_ip: "34.123.44.187",
  }]

  // Cargar pedidos pendientes del usuario
  const pendingOrders: OrderType[] = await prisma.orders.findMany({
    where: {
      userId: user.id,
      status: {
        in: ["pending", "deploying"] // Incluir también "deploying" para casos de reconexión
      },
    },
    select: {
      id: true,
      typeOfServer: true,
      status: true,
      requestAt: true,
      userId: true,
    },
    orderBy: {
      requestAt: "desc", // Ordenar por fecha de solicitud más reciente
    },
  }).then(orders => 
    orders.map(order => ({
      ...order,
      requestAt: order.requestAt.toISOString()
    }))
  )

  // Logging para debugging (puedes quitarlo en producción)
  console.log('📊 Dashboard loaded:', {
    userId: user.id,
    initialServers: initialServers.length,
    pendingOrders: pendingOrders.length,
    initialOrderId
  })

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-col items-center justify-center">
      <div className="mb-2 md:mb-4 flex items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      </div>
      
      <section className="w-full flex justify-end items-center border-2 border-slate-700 mb-4">
        <Link
          href="/dashboard/create"
          className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors"
        >
          Create Server
        </Link>
      </section>

      {/* Mostrar info de debugging si hay orderId en URL (puedes quitar esto) */}
      {initialOrderId && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            📡 Tracking order: <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">{initialOrderId}</code>
          </p>
        </div>
      )}

      {/* Mostrar mensaje si no hay servers ni orders */}
      {initialServers.length === 0 && pendingOrders.length === 0 && !initialOrderId && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p className="text-lg mb-2">No servers yet</p>
          <p className="text-sm">Click "Create Server" to get started!</p>
        </div>
      )}

      <DashboardClient 
        initialServers={initialServers} 
        pendingOrders={pendingOrders}
        initialOrderId={initialOrderId}
      />
    </main>
  )
}