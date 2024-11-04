"use client"

import { Trash2 } from "lucide-react"

interface DisplayFilesProps {
  files: File[] | null
  setFiles: (files: File[] | null) => void
}
const DisplayFiles = ({ files, setFiles }: DisplayFilesProps) => {
  if (!files || files.length === 0) {
    return null
  }

  return (
    <div className="mt-4 flex flex-wrap gap-2 w-full">
      {files.map((file, index) => (
        <div
          key={index}
          className="flex gap-2 bg-background rounded-xl py-1 px-3"
        >
          <p className="text-xs">{file.name}</p>
          <button
            onClick={() => {
              setFiles(files.filter((_, i) => i !== index))
            }}
          >
            <Trash2 size={14} color="#ef4444" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default DisplayFiles
