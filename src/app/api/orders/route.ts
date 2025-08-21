import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/dal/user/get-user";

export async function POST(req: NextRequest) {
  try {
    // 1️⃣ Obtener el usuario autenticado
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { error: "Usuario no autenticado" },
        { status: 401 }
      );
    }

    // 2️⃣ Parsear el body
    let body: { server?: string; wordpressSiteTitle?: string; drupalProfile?: string };
    try {
      body = await req.json();
    } catch (err) {
      console.error("Error parsing JSON:", err);
      return NextResponse.json(
        { error: "Request body inválido" },
        { status: 400 }
      );
    }

    const { server, wordpressSiteTitle, drupalProfile } = body;

    if (!server) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // 3️⃣ Crear la order en la DB
    const order = await prisma.orders.create({
      data: {
        typeOfServer: server,
        userId: user.id,
        // opcional:
        //xtraData: JSON.stringify({ wordpressSiteTitle, drupalProfile }),
      },
    });

    // 4️⃣ Respuesta exitosa con ID de la order
    return NextResponse.json({ success: true, orderId: order.id });

  } catch (err) {
    console.error("POST /api/orders unexpected error:", err);
    return NextResponse.json(
      { error: "Error al crear el pedido", details: String(err) },
      { status: 500 }
    );
  }
}
