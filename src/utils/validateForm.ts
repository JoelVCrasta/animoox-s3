import { toast } from "react-hot-toast"
import {
  addIconSchema,
  addPackSchema,
  filesSchema,
  preAddIconSchema,
  preAddPackSchema,
} from "@/utils/zodSchema"
import type { IIconFormData, IPackFormData, IPackFiles } from "@/utils/types"

export const validateIconForm = (data: IIconFormData) => {
  try {
    addIconSchema.parse(data)
    return true
  } catch (err) {
    toast.error("Please fill all the fields.")
    return false
  }
}

export const validatePreAddIcon = (data: IIconFormData) => {
  try {
    preAddIconSchema.parse(data)
    return true
  } catch (err) {
    toast.error("Please fill all the fields.")
    return false
  }
}

export const validateAddProduct = (data: IPackFormData) => {
  try {
    addPackSchema.parse(data)
    return true
  } catch (err) {
    toast.error("Please fill all the fields.")
    return false
  }
}

export const validatePreAddProduct = (data: IPackFormData) => {
  try {
    preAddPackSchema.parse(data)
    return true
  } catch (err) {
    toast.error("Please fill all the fields.")
    return false
  }
}

export const validateFiles = (data: IPackFiles) => {
  try {
    filesSchema.parse(data)
    return true
  } catch (err) {
    toast.error("Please upload all the files.")
    return false
  }
}
