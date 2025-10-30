import { env } from '@/lib/env'
import { BEARER_TOKEN_KEY } from '../constants/auth'
import type { AuthData, AuthResponse } from '../types/types'
import { auth_fetch } from '@/lib/auth-fetch'

export async function loginService(
	email: string,
	password: string,
): Promise<AuthData> {
	try {
		const usersLoginURL = new URL(`${env.BACKEND_URL}/users/signin/`)

		const response = await auth_fetch(usersLoginURL.toString(), {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		})

		const authToken = response.headers.get('set-auth-token') ?? ''
		localStorage.setItem(BEARER_TOKEN_KEY, authToken)

		if (!response.ok) {
			throw new Error('Failed to fetch user')
		}

		const data = (await response.json()) as AuthResponse

		return data.response
	} catch {
		throw new Error('Failed to fetch user')
	}
}
