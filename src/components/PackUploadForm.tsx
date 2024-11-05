"use client"

import { TagsInput } from "react-tag-input-component"
import Select from "./Select"
import Input from "./Input"
import InputArea from "./InputArea"
import FileUpload from "./FileUpload"
import KeyFeatures from "./KeyFeatures"
import DisplayFiles from "./DisplayFiles"
import CompatibilityIcons from "./CompatibilityIcons"
import { IPackFormData, IPackFiles } from "@/utils/types"

interface IconUploadFormProps {
  packFormData: IPackFormData
  setPackFormData: (value: IPackFormData) => void
  files: IPackFiles
  setFiles: (files: IPackFiles) => void
}

const PackUploadForm = ({
  packFormData,
  setPackFormData,
  files,
  setFiles,
}: IconUploadFormProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full p-8 bg-white rounded-3xl">
        <div className="flex flex-col lg:flex-row gap-x-8">
          <div className="flex flex-col gap-6 lg:gap-0 w-full">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 lg:mb-6 gap-x-8 gap-y-6">
              <Input
                label="Title"
                value={packFormData.title}
                onChange={(value) =>
                  setPackFormData({ ...packFormData, title: String(value) })
                }
                placeholder="3D Illustration Pack"
              />

              <Input
                label="Sub Title"
                value={packFormData.subtitle}
                onChange={(value) =>
                  setPackFormData({ ...packFormData, subtitle: String(value) })
                }
                placeholder="3D Illustration Pack"
              />

              <Input
                label={"Package Price"}
                value={packFormData.packagePrice}
                onChange={(value) =>
                  setPackFormData({
                    ...packFormData,
                    packagePrice: Number(value),
                  })
                }
                type="number"
              />

              <Input
                label={"Discount"}
                value={packFormData.discount}
                onChange={(value) =>
                  setPackFormData({ ...packFormData, discount: Number(value) })
                }
                type="number"
              />
            </div>

            <InputArea
              label="Description"
              value={packFormData.description}
              onChange={(value) =>
                setPackFormData({ ...packFormData, description: value })
              }
              placeholder="Enter your description"
            />
          </div>

          <div className="flex flex-col  gap-6 lg:w-1/2 mt-4 lg:mt-0">
            <Select
              label="Category"
              options={["Illustrations", "3D Illustrations", "Animation"]}
              value={packFormData.category}
              onChange={(value) =>
                setPackFormData({ ...packFormData, category: value })
              }
              placeholder="Select Category"
            />

            <div className="h-full">
              <FileUpload
                label={"Thumbnail"}
                subLabel={"Thumbnail 250x250"}
                accept={"images/*"}
                files={files.thumbnailFile}
                setFiles={(file) => setFiles({ ...files, thumbnailFile: file })}
                height={96}
                multiple={false}
              />
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          <FileUpload
            label={"Main Files (Illustration)"}
            subLabel={""}
            accept={".zip"}
            files={files.illustrationFile}
            setFiles={(file) => setFiles({ ...files, illustrationFile: file })}
            multiple={false}
          />

          <FileUpload
            label={"Main Files (Animation)"}
            accept={".zip"}
            files={files.animationFile}
            setFiles={(file) => setFiles({ ...files, animationFile: file })}
            multiple={false}
          />
        </div>

        <div className="mt-6">
          <FileUpload
            label={"Feature Image"}
            subLabel={
              "Images will be cropped at 800x600 for the thumbnail preview but will remain unchanged in full view mode."
            }
            accept={"images/*"}
            files={files.featureImageFiles}
            setFiles={(file) => setFiles({ ...files, featureImageFiles: file })}
            multiple={false}
          />
        </div>

        <div className="mt-6">
          <FileUpload
            label={"Product View Images"}
            subLabel={
              "Images will be cropped at 800x600 for the thumbnail preview but will remain unchanged in full view mode."
            }
            accept={"images/*"}
            files={files.productViewImageFiles}
            setFiles={(file) =>
              setFiles({ ...files, productViewImageFiles: file })
            }
            multiple={true}
          />

          <div className="flex flex-col lg:flex-row gap-4 mt-6">
            <div className="w-full lg:w-2/3 flex flex-col gap-6">
              <div className="w-full flex flex-wrap gap-8">
                <Select
                  label="Graphic File Included"
                  options={[
                    "None",
                    "Adobe Illustrator",
                    "Adobe Express",
                    "Sketch",
                    "SVG",
                    "Figma",
                  ]}
                  value={packFormData.graphicFileIncluded}
                  onChange={(value) =>
                    setPackFormData({
                      ...packFormData,
                      graphicFileIncluded: value,
                    })
                  }
                  placeholder="Select Option"
                />

                <div className="min-w-[200px] flex-1">
                  <label className="block text-gray-700 font-semibold mb-1">
                    Compatibilty <span className="text-red-500">*</span>
                  </label>

                  <CompatibilityIcons
                    value={packFormData.compatibility}
                    onChange={(value) =>
                      setPackFormData({ ...packFormData, compatibility: value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Tags <span className="text-red-500">*</span>
                </label>
                <div className="border-[1px] border-gray-300 rounded-lg outline-none">
                  <TagsInput
                    value={packFormData.tags}
                    onChange={(value) => {
                      setPackFormData({ ...packFormData, tags: value })
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

            <div className="w-full lg:w-1/3">
              <label className="block text-gray-700 font-semibold mb-1">
                Key Features <span className="text-red-500">*</span>
              </label>
              <KeyFeatures
                keyFeatures={packFormData.keyFeatures}
                setKeyFeatures={(value) =>
                  setPackFormData({ ...packFormData, keyFeatures: value })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PackUploadForm
