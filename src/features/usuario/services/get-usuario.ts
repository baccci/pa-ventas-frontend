import Cookies from 'js-cookie'
import { env } from '@/lib/env'
import type { AuthResponse } from '../types/types'

const AUTH_COOKIE_NAME = 'better-auth.session_token'
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

		return data
	} catch {
		throw new Error('Failed to fetch user')
	}
}

export function getAuthToken(): string | undefined {
	// Note: HTTP-only cookies cannot be read via JavaScript
	// This will always return undefined for HTTP-only cookies
	// The browser will automatically include them in requests though
	return Cookies.get(AUTH_COOKIE_NAME)
}

export function getUser() {
	const userCookie = Cookies.get(USER_COOKIE_NAME)
	return userCookie ? JSON.parse(userCookie) : null
}

/**
 * Check if the session token cookie exists by making a test request
 * Since HTTP-only cookies can't be read via JavaScript, we verify by
 * checking if subsequent API calls work
 */
export async function checkAuthCookie(): Promise<boolean> {
	try {
		const backendUrl = env.BACKEND_URL || 'http://localhost:3000'

		// Make a simple request to verify if the cookie is being sent
		const response = await fetch(`${backendUrl}/users/verify`, {
			method: 'GET',
			credentials: 'include',
		})

		return response.ok
	} catch {
		return false
	}
}
