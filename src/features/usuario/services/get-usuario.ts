import { env } from '@/lib/env'
import type { AuthResponse } from '../types/types'

export async function loginService(
	email: string,
	password: string,
): Promise<AuthResponse> {
	try {
		const backendUrl = env.BACKEND_URL || 'http://localhost:3000'
		const productsApiUrl = new URL(`${backendUrl}/users/signin/`)

		const response = await fetch(productsApiUrl.toString(), {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		})

		if (!response.ok) {
			throw new Error('Failed to fetch user')
		}

		const data = (await response.json()) as AuthResponse

		return data
	} catch {
		throw new Error('Failed to fetch user')
	}
}
