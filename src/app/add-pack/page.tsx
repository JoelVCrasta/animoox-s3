"use client"

import { useState } from "react"
import PackUploadForm from "@/components/PackUploadForm"
import HeadingInfo from "@/components/HeadingInfo"
import type { IPackFormData, IPackFiles } from "@/utils/types"
import { addPackSchema, filesSchema } from "@/utils/zodSchema"
import { fileUpload } from "@/lib/s3Upload"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"

const AddPack = () => {
  const [files, setFiles] = useState<IPackFiles>({
    thumbnailFile: null,
    illustrationFile: null,
    animationFile: null,
    featureImageFiles: null,
    productViewImageFiles: null,
  })

  const [packFormData, setPackFormData] = useState<IPackFormData>({
    title: "",
    subtitle: "",
    category: "",
    description: "",
    packagePrice: 0,
    discount: 0,
    thumbnailUrl: "",
    illustrationUrl: "",
    animationUrl: "",
    featureImageUrl: "",
    productViewImageUrl: [],
    graphicFileIncluded: "",
    tags: [],
    keyFeatures: [],
  })

  const validateAddProduct = (data: IPackFormData) => {
    try {
      addPackSchema.parse(data)
      return true
    } catch (err) {
      toast.error("Please fill all the fields.")
      return false
    }
  }

  const validateFiles = (data: IPackFiles) => {
    try {
      filesSchema.parse(data)
      return true
    } catch (err) {
      toast.error("Please upload all the files.")
      return false
    }
  }

  const clearForm = () => {
    setPackFormData({
      title: "",
      subtitle: "",
      category: "",
      description: "",
      packagePrice: 0,
      discount: 0,
      thumbnailUrl: "",
      illustrationUrl: "",
      animationUrl: "",
      featureImageUrl: "",
      productViewImageUrl: [],
      graphicFileIncluded: "",
      tags: [],
      keyFeatures: [],
    })

    setFiles({
      thumbnailFile: null,
      illustrationFile: null,
      animationFile: null,
      featureImageFiles: null,
      productViewImageFiles: null,
    })
  }

  const handleSaveAsDraft = async () => {
    console.log("Save as draft")
  }

  const handlePublishProduct = async () => {
    const isFilesValid = validateFiles(files)
    if (isFilesValid === false) {
      toast.error("Please upload all the files.")
      return
    }

    try {
      console.log("packFormData", packFormData)
    } catch (err) {
      console.error(err)
      toast.error("Error uploading the icon file")
    }

    console.log("packFormData", packFormData)
  }

  return (
    <section className="flex">
      <Toaster />
      <div className="w-80 bg-white">sidebar</div>

      <div className="w-full p-4 md:p-10">
        <div>
          <div className="space-y-2">
            <p className="text-sm text-gray-700/80">Pages / Add Product</p>
            <p className="text-3xl font-bold text-gray-700">Add New Icon</p>
          </div>

          <div></div>
        </div>

        <HeadingInfo
          title="Add the pack information below"
          handleSaveAsDraft={handleSaveAsDraft}
          handlePublishProduct={handlePublishProduct}
        />

        <PackUploadForm
          packFormData={packFormData}
          setPackFormData={setPackFormData}
          files={files}
          setFiles={setFiles}
        />
      </div>
    </section>
  )
}

export default AddPack
