import { auth_fetch } from '@/lib/auth-fetch'
import { env } from '@/lib/env'
import ventasArrayMock from '../data'
import type { VentasResponse } from '../types/service-response'

export async function getProductsService(): Promise<VentasResponse> {
	return new Promise((resolve, reject) => {
		const ventasURL = new URL(`${env.BACKEND_URL}/ventas`)
		const isDev = process.env.NODE_ENV === 'development'

		if (isDev) {
			return resolve(ventasArrayMock)
		}

		auth_fetch(ventasURL.toString(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				if (!response.ok) {
					reject(new Error('Failed to fetch products'))
				}

				return response.json()
			})
			.then((data) => {
				resolve(data as VentasResponse)
			})
			.catch((error) => {
				reject(error)
			})
	})
}
