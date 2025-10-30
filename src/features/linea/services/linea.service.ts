import { env } from '@/lib/env'
import { auth_fetch } from '@/lib/auth-fetch'
import type { LineaResponse } from '../types/linea'

const API_URL = env.BACKEND_URL || 'http://localhost:3000'
const lineasApiUrl = (`${API_URL}/linea`)

export const createLinea = async (nombre: string, descripcion: string | undefined, marcaId: string | undefined): Promise<LineaResponse> => {
  try {
    const response = await auth_fetch(lineasApiUrl.toString(), {
        method: 'POST',
        body: JSON.stringify({ nombre, descripcion, marcaId }),
        headers: {
          'Content-Type': 'application/json'
        }, 
        credentials: 'include'
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch lineas')
      }

      const data = await response.json()
      return data as LineaResponse
  } catch {
    throw new Error('Failed to fetch lineas')
  }
}

export const getLineas = async () => {
  try {
    const response = await auth_fetch(lineasApiUrl.toString(), {
        method: 'GET',
        body: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json'
        }, 
        credentials: 'include'
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch lineas')
      }

      const data = await response.json()
      return data as LineaResponse
  } catch {
    throw new Error('Failed to fetch lineas')
  }
}
