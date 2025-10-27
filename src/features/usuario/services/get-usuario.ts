import Cookies from 'js-cookie'
import { env } from '@/lib/env'
import type { AuthResponse } from '../types/types'

const AUTH_COOKIE_NAME = 'auth_token'
const USER_COOKIE_NAME = 'user'

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

		// Store token and user in cookies
		Cookies.set(AUTH_COOKIE_NAME, data.token, { expires: 7 }) // Expires in 7 days
		Cookies.set(USER_COOKIE_NAME, JSON.stringify(data.user), { expires: 7 })

		return data
	} catch {
		throw new Error('Failed to fetch user')
	}
}

export function getAuthToken(): string | undefined {
	return Cookies.get(AUTH_COOKIE_NAME)
}

export function getUser() {
	const userCookie = Cookies.get(USER_COOKIE_NAME)
	return userCookie ? JSON.parse(userCookie) : null
}

export function removeAuthCookies() {
	Cookies.remove(AUTH_COOKIE_NAME)
	Cookies.remove(USER_COOKIE_NAME)
}
