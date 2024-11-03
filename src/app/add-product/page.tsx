"use client"

import { useState } from "react"
import IconUploadForm from "@/components/IconUploadForm"
import { Upload } from "lucide-react"
import type { IIconFormData } from "@/utils/types"
// import z from "zod"

const AddProduct = () => {
  const [iconFormData, setIconFormData] = useState<IIconFormData>({
    iconStyle: "",
    license: "",
    category: "",
    tags: [],
    file: [],
  })

  const handleSaveAsDraft = () => {
    console.log("Save as draft")
  }

  const handlePublishProduct = () => {
    console.log(iconFormData)
  }

  return (
    <section className="flex ">
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
        />
      </div>
    </section>
  )
}

export default AddProduct
