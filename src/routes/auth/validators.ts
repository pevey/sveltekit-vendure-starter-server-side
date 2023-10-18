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