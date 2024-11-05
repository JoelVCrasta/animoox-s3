import prismaClient from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { IPackFormData } from "@/utils/types"

export async function POST(req: NextRequest) {
  const body: IPackFormData = await req.json()
  const {
    title,
    subtitle,
    category,
    description,
    packagePrice,
    discount,
    thumbnailUrl,
    illustrationUrl,
    animationUrl,
    featureImageUrl,
    productViewImageUrl,
    graphicFileIncluded,
    compatibility,
    tags,
    keyFeatures,
  } = body

  try {
    await prismaClient.packs.create({
      data: {
        title,
        subtitle,
        category,
        description,
        packagePrice,
        discount,
        thumbnailUrl,
        illustrationUrl,
        animationUrl,
        featureImageUrl,
        productViewImageUrl: { set: productViewImageUrl },
        graphicFileIncluded,
        compatibility,
        tags: { set: tags },
        keyFeatures: { set: keyFeatures },
      },
    })

    return NextResponse.json({
      success: true,
      message: "Pack added successfully",
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error adding product",
    })
  }
}
