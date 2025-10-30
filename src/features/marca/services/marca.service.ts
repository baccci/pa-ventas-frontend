import { env } from '@/lib/env'
import { auth_fetch } from '@/lib/auth-fetch'
import type { MarcaResponse } from '../types/marca'

const API_URL = env.BACKEND_URL || 'http://localhost:3000'

export const createMarca = async (nombre: string, descripcion: string | undefined): Promise<MarcaResponse> => {
  try {
    const marcasApiUrl = (`${API_URL}/marca`)
    const response = await auth_fetch(marcasApiUrl.toString(), {
        method: 'POST',
        body: JSON.stringify({ nombre, descripcion }),
        headers: {
          'Content-Type': 'application/json'
        }, 
        credentials: 'include'
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data = await response.json()
      return data as MarcaResponse
  } catch {
    throw new Error('Failed to fetch products')
  }
}

export const getMarcas = async (linea: string): Promise<MarcaResponse> => {
  try {
    const marcasApiUrl = (`${API_URL}/linea/${linea}/marcas`)
    const response = await auth_fetch(marcasApiUrl.toString(), {
        method: 'GET',
        credentials: 'include'
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch marcas')
      }

      const data = await response.json()
      return data as MarcaResponse
  } catch {
    throw new Error('Failed to fetch marcas')
  }
}
