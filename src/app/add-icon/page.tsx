"use client"

import { useState, useEffect } from "react"
import IconUploadForm from "@/components/IconUploadForm"
import HeadingInfo from "@/components/HeadingInfo"
import type { IIconFormData } from "@/utils/types"
import { fileUpload } from "@/actions/s3Upload"
import toast, { Toaster } from "react-hot-toast"
import { validateIconForm } from "@/utils/validateForm"
import axios from "axios"

const AddIcon = () => {
  const [files, setFiles] = useState<File[] | null>(null)
  const [iconFormData, setIconFormData] = useState<IIconFormData>({
    iconStyle: "",
    license: "",
    category: "",
    tags: [],
    file: [],
  })

  const clearForm = () => {
    setIconFormData({
      iconStyle: "",
      license: "",
      category: "",
      tags: [],
      file: [],
    })

    setFiles(null)
  }

  useEffect(() => {
    const iconFormDataDraft = localStorage.getItem("iconFormData")
    if (iconFormDataDraft) {
      setIconFormData(JSON.parse(iconFormDataDraft))
    }

    localStorage.removeItem("iconFormData")
  }, [])

  const handleSaveAsDraft = async () => {
    localStorage.setItem("iconFormData", JSON.stringify(iconFormData))
    toast.success("Saved as draft")
  }

  const handlePublishProduct = async () => {
    if (!files || files.length === 0) {
      toast.error("Please upload the icon file")
      return
    }

    try {
      const preValidity = validateIconForm(iconFormData)
      if (preValidity === false) return

      const fileUrls = await fileUpload(files, "icons")
      console.log(fileUrls)

      if (fileUrls.s3Status === "error") {
        toast.error("Error uploading the icon file")
        return
      }

      const updatedFormData = {
        ...iconFormData,
        file: fileUrls.fileUrls || [],
      }
      console.log(updatedFormData)

      const validity = validateIconForm(updatedFormData)
      if (validity === false) return

      const response = await axios.post("/api/add-icon", updatedFormData)

      if (response.data.success) {
        console.log(response.data)
        toast.success("Icon uploaded successfully")
      } else {
        toast.error("Error uploading the icon")
      }

      clearForm()
    } catch (err) {
      console.error(err)
      toast.error("Something went wrong")
    }
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
          title="Add the icon information below"
          handleSaveAsDraft={handleSaveAsDraft}
          handlePublishProduct={handlePublishProduct}
        />

        <IconUploadForm
          iconFormData={iconFormData}
          setIconFormData={setIconFormData}
          files={files}
          setFiles={setFiles}
        />
      </div>
    </section>
  )
}

export default AddIcon
