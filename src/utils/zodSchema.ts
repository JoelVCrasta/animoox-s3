import z from "zod"

export const addIconSchema = z.object({
  iconStyle: z.string().min(1),
  license: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string()).min(1),
  file: z.array(z.string()).min(1),
})

export const preAddIconSchema = z.object({
  iconStyle: z.string().min(1),
  license: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string()).min(1),
})

export const addPackSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  packagePrice: z.number().min(1),
  discount: z.number(),
  thumbnailUrl: z.string().min(1),
  illustrationUrl: z.string().min(1),
  animationUrl: z.string().min(1),
  featureImageUrl: z.string().min(1),
  productViewImageUrl: z.array(z.string()).min(1),
  graphicFileIncluded: z.string().min(1),
  compatibility: z.string().min(1),
  tags: z.array(z.string()).min(1),
  keyFeatures: z.array(z.string()),
})

export const preAddPackSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  packagePrice: z.number().min(1),
  discount: z.number(),
  graphicFileIncluded: z.string().min(1),
  compatibility: z.string().min(1),
  tags: z.array(z.string()).min(1),
  keyFeatures: z.array(z.string()),
})

export const filesSchema = z.object({
  thumbnailFile: z.array(z.instanceof(File)).min(1),
  illustrationFile: z.array(z.instanceof(File)).min(1),
  animationFile: z.array(z.instanceof(File)).min(1),
  featureImageFiles: z.array(z.instanceof(File)).min(1),
  productViewImageFiles: z.array(z.instanceof(File)).min(1),
})
