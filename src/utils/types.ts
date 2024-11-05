export interface IIconFormData {
  iconStyle: string
  license: string
  category: string
  tags: string[]
  file: string[]
}

export interface IPackFormData {
  title: string
  subtitle: string
  category: string
  description: string
  packagePrice: number
  discount: number
  thumbnailUrl: string
  illustrationUrl: string
  animationUrl: string
  featureImageUrl: string
  productViewImageUrl: string[]
  graphicFileIncluded: string
  compatibility: string
  tags: string[]
  keyFeatures: string[]
}

export interface IPackFiles {
  thumbnailFile: File[] | null
  illustrationFile: File[] | null
  animationFile: File[] | null
  featureImageFiles: File[] | null
  productViewImageFiles: File[] | null
}
