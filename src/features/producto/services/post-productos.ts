import { env } from '@/lib/env'
import type { ProductResponse } from '../types/types'
import { auth_fetch } from '@/lib/auth-fetch'

export async function postProductsService(nombre: string, stock: number, precio: number, marcaxlinea: string, descripcion: string | undefined): Promise<ProductResponse> {
  try {
    const backendUrl = env.BACKEND_URL || 'http://localhost:3000'

    const productsApiUrl = new URL(`${backendUrl}/product`)

    const response = await auth_fetch(productsApiUrl.toString(), {
      method: 'POST',
      body: JSON.stringify({ nombre, stock, precio, marcaxlinea, descripcion }),
      headers: {
        'Content-Type': 'application/json'
      }, 
      credentials: 'include'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }

    const data = await response.json()
    return data as ProductResponse
  } catch {
    throw new Error('Failed to fetch products')
  }
}