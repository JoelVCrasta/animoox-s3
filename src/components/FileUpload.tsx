"use client"

import { useState } from "react"
import { Upload } from "lucide-react"
import DisplayFiles from "@/components/DisplayFiles"

interface FileUploadProps {
  label: string
  subLabel?: string
  accept: string
  files: File[] | null
  setFiles: (files: File[] | null) => void
  height?: number
  multiple?: boolean
}

const FileUpload = ({
  label,
  subLabel,
  accept,
  files,
  setFiles,
  height,
  multiple = true,
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files) {
      setFiles(Array.from(e.dataTransfer.files))
    }
  }

  return (
    <div className="w-full h-full">
      <label className="block text-gray-700 font-semibold mb-2">
        {label} <span className="text-red-500">*</span>
      </label>

      <div
        className={`
          flex flex-col h-[376px] items-center justify-center border-2 border-dashed border-gray-300  rounded-lg bg-gray-100 text-gray-400 font-semibold
          ${height ? `h-${height}` : "p-16"}
          ${isDragging ? "border-blue-500" : ""}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          id={label}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={(e) => {
            if (e.target.files) {
              setFiles(Array.from(e.target.files))
            }
          }}
          className="hidden"
        />

        <Upload size={60} color="#9ca3af" />
        <label htmlFor={label} className="cursor-pointer mt-2">
          Drag & Drop or{" "}
          <span className="text-blue-500 font-semibold">Choose file</span> to
          upload
        </label>

        <div className="text-center mt-2">
          {subLabel && <p className="text-xs font-thin">{subLabel}</p>}
          <p className="text-xs font-thin ">
            Accepted file formats: {accept === ".zip" ? "ZIP" : "JPG, PNG"}
          </p>
        </div>
      </div>

      <DisplayFiles files={files} setFiles={setFiles} />
    </div>
  )
}

export default FileUpload
