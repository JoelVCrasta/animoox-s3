"use client"

import { Upload } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"
import DisplayFiles from "@/components/DisplayFiles"

interface FileUploadProps {
  label: string
  accept: string
  files: File[] | null
  setFiles: (files: File[] | null) => void
}

const FileUpload = ({ label, accept, files, setFiles }: FileUploadProps) => {
  const displayFiles = () => {
    if (files) {
      console.log("Files selected:", files)
    }
  }

  return (
    <div>
      <label className="block text-gray-700 font-semibold mb-2">
        {label} <span className="text-red-500">*</span>
      </label>

      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-16 rounded-lg bg-gray-100 text-gray-400 font-semibold">
        <input
          type="file"
          multiple={true}
          accept={accept}
          onChange={(e) => {
            if (e.target.files) {
              setFiles(Array.from(e.target.files))
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

      <DisplayFiles files={files} setFiles={setFiles} />
    </div>
  )
}

export default FileUpload
