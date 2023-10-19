import { z } from 'zod'

export const signInReq = z.object({
   email: z.string().email().refine((val) => val.length > 0, {
      message: 'Email is required'
   }),
   password: z.string().min(6),
   token: z.string().min(1)
})

export const signUpReq = z.object({
   email: z.string().email().refine((val) => val.length > 0, {
      message: 'Email is required'
   }),
   fname: z.string().min(1),
   lname: z.string().min(1),
   password: z.string().min(6),
   token: z.string().min(1)
})

export const forgotReq = z.object({
   email: z.string().email().refine((val) => val.length > 0, {
      message: 'Email is required'
   }),
   token: z.string().min(1)
})

export const resetReq = z.object({
   code: z.string().min(1),
   password: z.string().min(6),
   token: z.string().min(1)
})

export const addReviewReq = z.object({
   token: z.string().min(1),
   productId: z.string().min(1),
   displayName: z.string().min(1).max(100),
   content: z.string().min(1).max(1000),
   rating: z.coerce.number().min(1).max(5).default(5)
})