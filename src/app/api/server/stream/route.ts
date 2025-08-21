// app/api/servers/stream/route.ts
import { NextRequest } from "next/server"
import prisma  from "@/lib/prisma"

const lambdaResExample = [
    {
      "id": "001",
      "icon": "file.svg",
      "name": "wordpress-test",
      "cpu": "0.5 vCPU",
      "memory": "1 GB",
      "region": "us-east-1",
      "status": "running",
      "public_ip": "34.152.46.148",
      "date_string": "2025-08-01T12:00:00Z",
      "orderId": "05057263-6593-4fc2-969b-80ac86c55402",
    }
  ]

export async function GET(req: NextRequest) {

  const url = new URL(req.url);
  const orderId = url.searchParams.get("orderId"); // <-- aquí lo obtienes
  console.log("ORDER ID:", orderId)
  if (!orderId) throw new Error("orderId is required");

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      async function pushUpdate() {
        try {
          //const res = await fetch("https://my-lambda.amazonaws.com/dev/servers")
           
          //const servers = await res.json()


          const servers = lambdaResExample // Simulando respuesta de Lambda
          
          // Simular await para delay
          await new Promise(resolve => setTimeout(resolve, 1000))
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(servers)}\n\n`)
          )

          // Aquí podrías actualizar el estado del pedido si es necesario
          await prisma.orders.update({
            where: { id: orderId as string },
            data: { status: "completed" },
          });

        } catch (err) {
          console.error("Lambda error", err)
        }
      }

      // enviar snapshot inicial
      await pushUpdate()

      // refrescar cada 3s (o usa WebSocket desde Lambda si quieres real-time total)
      const interval = setInterval(pushUpdate, 3000)

      req.signal.addEventListener("abort", () => {
        clearInterval(interval)
      })
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
