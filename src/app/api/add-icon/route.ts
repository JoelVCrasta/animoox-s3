import prismaClient from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { IIconFormData } from "@/utils/types"

export async function POST(req: NextRequest) {
  const body: IIconFormData = await req.json()
  const { iconStyle, license, category, tags, file } = body

  try {
    console.log(body)

    await prismaClient.icons.create({
      data: {
        iconStyle,
        license,
        category,
        tags: { set: tags },
        file: { set: file },
      },
    })

    return NextResponse.json({
      success: true,
      message: "Icon added successfully",
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error adding product",
    })
  }
}
