import { s3Client } from "@/lib/aws-config"
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"

interface UrlResponse {
  s3Status: "success" | "error"
  imageUrl?: string
}

export async function imageUpload(file: File): Promise<UrlResponse> {
  if (!file) {
    console.error("No file provided for upload.")
    return { s3Status: "error" }
  }

  const fileName = `${Date.now()}-${file.name.replace(/\s/g, "_")}`
  console.log("Uploading file:", fileName)

  const params = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    Key: `icons/${fileName}`,
    Body: file,
  }

  const command = new PutObjectCommand(params)

  try {
    await s3Client.send(command)
    return {
      s3Status: "success",
      imageUrl: `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.amazonaws.com/icons/${fileName}`,
    }
  } catch (err) {
    console.error("Error uploading file:", err)
    return { s3Status: "error", imageUrl: "" }
  }
}

export async function imageRemove(imageUrl: string): Promise<UrlResponse> {
  const fileName = imageUrl.split("/").pop()
  if (!fileName) {
    console.error("Invalid image URL provided for removal.")
    return { s3Status: "error" }
  }

  const params = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    Key: `icons/${fileName}`,
  }

  try {
    await s3Client.send(new DeleteObjectCommand(params))
    return {
      s3Status: "success",
    }
  } catch (err) {
    console.error("Error removing file:", err)
    return { s3Status: "error" }
  }
}
