import { getUser } from "@/dal/user/get-user"
import  prisma  from "@/lib/prisma" // asumiendo que tienes Prisma configurado
import DashboardClient from "./DashboardClient"
import Link from "next/link"
import { ServerType, OrderType } from "@/types" // Asegúrate de tener este tipo definido


export default async function Dashboard() {
  // Obtener información del usuario
  const user = await getUser()
  if (!user) {
    throw new Error("User not found")
  }

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

  const initialServers : ServerType[] = [{
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

  // Cargar pedidos pendientes
  const pendingOrders: OrderType[] = await prisma.orders.findMany({
    where: {
      userId: user.id,
      status: "pending",
    },
    select: {
      id: true,
      typeOfServer: true,
      status: true,
      requestAt: true,
      userId: true, // Asegúrate de que este campo esté disponible
    },
    orderBy: {
        requestAt: "desc", // Ordenar por fecha de solicitud
    },
  }).then(orders => orders.map(o => ({ ...o, requestAt: o.requestAt.toISOString() })))

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

      <DashboardClient initialServers={initialServers} pendingOrders={pendingOrders} />
    </main>
  )
}
