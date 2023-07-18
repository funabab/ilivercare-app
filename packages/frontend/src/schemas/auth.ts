import { z } from 'zod'

export const loginBodySchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address'),
  password: z
    .string({ required_error: 'Password is required' })
    .trim()
    .min(1, "Password can't be empty"),
})

export const regsiterBodySchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address'),
  firstName: z
    .string({ required_error: 'First name is required' })
    .trim()
    .min(1, "First name can't be empty"),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .trim()
    .min(1, "Last name can't be empty"),
  password: z
    .string({ required_error: 'Password is required' })
    .trim()
    .min(1, "Password can't be empty"),
  role: z
    .string({ required_error: 'Role is required' })
    .trim()
    .min(1, "Role can't be empty"),
})

export type LoginBody = z.infer<typeof loginBodySchema>
export type RegisterBody = z.infer<typeof regsiterBodySchema>
