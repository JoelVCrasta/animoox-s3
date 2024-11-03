"use client"

import { Upload } from "lucide-react"
import { imageUpload, imageRemove } from "@/lib/s3Upload"
import Image from "next/image"
import toast, { Toaster } from "react-hot-toast"

interface FileUploadProps {
  label: string
  accept: string
  value: string[]
  onChange: (value: string[]) => void
}

const FileUpload = ({ label, accept, value, onChange }: FileUploadProps) => {
  const uploadFileS3 = async (file: File) => {
    const response = await imageUpload(file)

    if (response.s3Status === "success") {
      console.log("File uploaded successfully:", response.imageUrl)

      if (response.imageUrl) {
        onChange([...value, response.imageUrl])
      }
    } else {
      console.error("Error uploading file.")
      toast.error("Error uploading file.")
    }
  }

  const removeFileS3 = async (fileUrl: string) => {
    const response = await imageRemove(fileUrl)

    if (response.s3Status === "success") {
      console.log("File removed successfully:", fileUrl)
      onChange(value.filter((url) => url !== fileUrl))
    } else {
      console.error("Error removing file.")
      toast.error("Error removing file.")
    }
  }

  return (
    <div>
      <Toaster />
      <label className="block text-gray-700 font-semibold mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-16 rounded-lg bg-gray-100 text-gray-400 font-semibold">
        <input
          type="file"
          accept={accept}
          onChange={(e) => {
            if (e.target.files) {
              uploadFileS3(e.target.files[0])
            }
          }}
          className="hidden"
          id="fileUpload"
        />
        <Upload size={60} color="#9ca3af" />
        <label htmlFor="fileUpload" className="cursor-pointer mt-2">
          Drag & Drop or{" "}
          <span className="text-blue-500 font-semibold">Choose file</span> to
          upload
        </label>
        <p className="text-xs font-thin mt-2">
          Accepted file formats: {accept}
        </p>
      </div>

      {value.length !== 0 && (
        <div className="mt-2 text-sm text-gray-700">
          <Image src={value[0]} alt="icon image" width={100} height={100} />
          <button onClick={() => removeFileS3(value[0])}>Remove</button>
        </div>
      )}
    </div>
  )
}

export default FileUpload
