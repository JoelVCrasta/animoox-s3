"use client"

import { TagsInput } from "react-tag-input-component"
import Select from "./Select"
import FileUpload from "./FileUpload"
import { IIconFormData } from "@/utils/types"

interface IconUploadFormProps {
  iconFormData: IIconFormData
  setIconFormData: (value: IIconFormData) => void
  files: File[] | null
  setFiles: (files: File[] | null) => void
}

const IconUploadForm = ({
  iconFormData,
  setIconFormData,
  files,
  setFiles,
}: IconUploadFormProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full p-8 bg-white rounded-3xl">
        <div className="flex flex-wrap gap-4 mb-6">
          <Select
            label="Style"
            options={["Flat", "Other"]}
            value={iconFormData.iconStyle}
            onChange={(value) =>
              setIconFormData({ ...iconFormData, iconStyle: value })
            }
            placeholder="Select Style"
          />

          <Select
            label="License"
            options={["Free", "Premium"]}
            value={iconFormData.license}
            onChange={(value) =>
              setIconFormData({ ...iconFormData, license: value })
            }
            placeholder="Select License"
          />

          <Select
            label="Category"
            options={["Alert", "Notification", "User Interface"]}
            value={iconFormData.category}
            onChange={(value) =>
              setIconFormData({ ...iconFormData, category: value })
            }
            placeholder="Select Category"
          />
        </div>

        <div className="mb-6">
          <FileUpload
            label={"Main files (Icon)"}
            accept={"images/*"}
            files={files}
            setFiles={setFiles}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-1">
            Tags <span className="text-red-500">*</span>
          </label>
          <div className="border-[1px] border-gray-300 rounded-lg outline-none">
            <TagsInput
              value={iconFormData.tags || []}
              onChange={(value) => {
                setIconFormData({ ...iconFormData, tags: value })
              }}
              separators={[" ", "Enter"]}
              beforeAddValidate={(tag) => tag.length <= 20}
              classNames={{
                input: "p-2 text-gray-400",
                tag: "bg-background text-gray-600 text-lg",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default IconUploadForm
