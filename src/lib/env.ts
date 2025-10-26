import { z } from 'zod'

export const envSchema = z.object({
  backend: z.object({
    URL: z.string(),
  }),
})

export const env = {
  backend: {
    URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  }
}

export function validateEnv() {
  return envSchema.parse(env)
}