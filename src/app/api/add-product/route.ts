import prismaClient from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()

  try {
    console.log(body)

    return NextResponse.json({
      success: true,
      message: "Product added successfully",
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error adding product",
    })
  }
}
