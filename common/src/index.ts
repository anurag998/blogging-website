import { z } from "zod"

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional()
})

export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const createBlogSchema = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean().optional()
})

export const updatedBlogSchema = z.object({
  blogId: z.string(),
  title: z.string(),
  content: z.string(),
  published: z.boolean().optional()
})

export type signupType = z.infer<typeof signupSchema>
export type signinType = z.infer<typeof signinSchema>
export type createBlogType = z.infer<typeof createBlogSchema>
export type updatedBlogType = z.infer<typeof updatedBlogSchema>

