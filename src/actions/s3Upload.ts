import { s3Client } from "@/lib/aws-config"
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import imageCompression from "browser-image-compression"

interface UrlResponse {
  s3Status: "success" | "error"
  fileUrls?: string[]
  fileUrl?: string
}

// Single file upload to S3 bucket
export async function singleFileUpload(
  file: File,
  folder: string
): Promise<UrlResponse> {
  if (!file) {
    console.error("No file provided for upload.")
    return { s3Status: "error" }
  }
  console.log(folder)

  const fileName = `${Date.now()}-${file.name}`
  const params = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    Key: `${folder}/${fileName}`,
    Body: file,
  }

  const command = new PutObjectCommand(params)

  try {
    await s3Client.send(command)
    const fileUrl = `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/${folder}/${fileName}`
    return {
      s3Status: "success",
      fileUrl: fileUrl,
    }
  } catch (err) {
    console.error("Error uploading file:", err)
    return { s3Status: "error" }
  }
}

// Multiple file upload to S3 bucket (makes use of singleFileUpload function)
export async function fileUpload(
  files: File[],
  folder: string
): Promise<UrlResponse> {
  if (!files || files.length === 0) {
    console.error("No files provided for upload.")
    return { s3Status: "error" }
  }

  const fileUrls = []

  for (const file of files) {
    const response = await singleFileUpload(file, folder)
    if (response.s3Status === "success" && response.fileUrl) {
      fileUrls.push(response.fileUrl)
    } else {
      return { s3Status: "error" }
    }
  }

  return {
    s3Status: "success",
    fileUrls: fileUrls,
  }
}

export async function imageCompUpload(
  files: File[],
  folder: string,
  size: number = 1,
  width: number = 800
): Promise<UrlResponse> {
  if (!files || files.length === 0) {
    console.error("No files provided for upload.")
    return { s3Status: "error" }
  }

  try {
    const compressedFiles = await imageComp(files, size, width)
    if (!compressedFiles) {
      return { s3Status: "error" }
    }

    const response = await fileUpload(compressedFiles as File[], folder)
    if (response.s3Status === "error") {
      return { s3Status: "error" }
    }

    return {
      s3Status: "success",
      fileUrls: response.fileUrls,
    }
  } catch (err) {
    console.error("Error compressing image:", err)
    return { s3Status: "error" }
  }
}

async function imageComp(
  files: File[],
  size: number,
  width: number
): Promise<File[] | null> {
  const compressedFiles = []
  const options = {
    maxSizeMB: size,
    maxWidthOrHeight: width,
    useWebWorker: true,
  }

  try {
    for (const file of files) {
      const compressedFile = await imageCompression(file, options)
      if (!compressedFile) {
        return null
      }
      compressedFiles.push(compressedFile)
    }

    return compressedFiles
  } catch (err) {
    return null
  }
}

// ------------------------------------------------------------------------

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
