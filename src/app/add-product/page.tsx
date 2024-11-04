"use client"

import { useState } from "react"
import IconUploadForm from "@/components/IconUploadForm"
import { Upload } from "lucide-react"
import type { IIconFormData } from "@/utils/types"
import { fileUpload } from "@/lib/s3Upload"
import toast, { Toaster } from "react-hot-toast"
import z from "zod"
import axios from "axios"

const AddProduct = () => {
  const [files, setFiles] = useState<File[] | null>(null)
  const [iconFormData, setIconFormData] = useState<IIconFormData>({
    iconStyle: "",
    license: "",
    category: "",
    tags: [],
    file: [],
  })

  const addProductSchema = z.object({
    iconStyle: z.string().min(1),
    license: z.string().min(1),
    category: z.string().min(1),
    tags: z.array(z.string()).min(1),
    file: z.array(z.string()).min(1),
  })

  const validateAddProduct = (data: IIconFormData) => {
    try {
      addProductSchema.parse(data)
    } catch (err) {
      toast.error("Please fill all the fields.")
      return false
    }
  }

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

  const handleSaveAsDraft = async () => {
    console.log("Save as draft")
  }

  const handlePublishProduct = async () => {
    if (!files) {
      toast.error("Please upload the icon file")
      return
    }

    try {
      const fileUrls = await fileUpload(files)
      console.log(fileUrls)

      if (fileUrls.s3Status === "error") {
        toast.error("Error uploading the icon file")
        return
      }

      const updatedFormData = {
        ...iconFormData,
        file: fileUrls.fileUrls || [],
      }
      setIconFormData(updatedFormData)
      console.log(updatedFormData)

      const validity = validateAddProduct(updatedFormData)
      if (validity === false) return

      const response = await axios.post("/api/add-product", iconFormData)

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
    <section className="flex ">
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

        <div className="flex flex-col gap-y-2 md:flex-row items-start md:items-center justify-between py-4">
          <h2 className="font-semibold text-lg text-gray-700">
            Add the icon information below
          </h2>

          <div className="w-full md:w-fit flex justify-between space-x-4">
            <button
              onClick={handleSaveAsDraft}
              className="py-3 px-6 font-semibold text-gray-400 border-2 border-gray-400 rounded-full text-sm"
            >
              Save as draft
            </button>

            <button
              onClick={handlePublishProduct}
              className="py-3 px-6 text-sm font-semibold bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 flex items-center"
            >
              <Upload size={20} className="mr-2" />
              Publish product
            </button>
          </div>
        </div>

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

export default AddProduct
