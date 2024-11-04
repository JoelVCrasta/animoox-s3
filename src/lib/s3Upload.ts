import { s3Client } from "@/lib/aws-config"
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"

interface UrlResponse {
  s3Status: "success" | "error"
  fileUrls?: string[]
}

export async function fileUpload(files: File[]): Promise<UrlResponse> {
  if (!files || files.length === 0) {
    console.error("No files provided for upload.")
    return { s3Status: "error" }
  }

  const fileUrls = []

  for (const file of files) {
    const fileName = `${Date.now()}-${file.name}`
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      Key: `icons/${fileName}`,
      Body: file,
    }

    const command = new PutObjectCommand(params)

    try {
      await s3Client.send(command)
      fileUrls.push(
        `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/${process.env.NEXT_PUBLIC_S3_FOLDER_NAME_1}/${fileName}`
      )
    } catch (err) {
      console.error("Error uploading file:", err)
      return { s3Status: "error" }
    }
  }

  return {
    s3Status: "success",
    fileUrls: fileUrls,
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
