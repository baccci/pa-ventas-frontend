import { z } from 'zod'

export const envSchema = z.object({
	BACKEND_URL: z.string(),
})

export const env = {
	BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
}

export function validateEnv() {
	return envSchema.parse(env)
}
