import { BEARER_TOKEN_KEY } from '@/features/usuario/constants/auth'

export function auth_fetch(url: string, options: RequestInit) {
	const bearerToken = localStorage.getItem(BEARER_TOKEN_KEY)
	if (bearerToken) {
		options.headers = {
			...options.headers,
			Authorization: `Bearer ${bearerToken}`,
		}
	}
	return fetch(url, options)
}
