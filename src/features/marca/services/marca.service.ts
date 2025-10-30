import { env } from '@/lib/env'
import { auth_fetch } from '@/lib/auth-fetch'
import type { MarcaResponse } from '../types/marca'

const API_URL = env.BACKEND_URL || 'http://localhost:3000'

export interface Marca {
  id?: string
  nombre: string
  descripcion?: string
}

// Obtener todas las marcas
export const getMarcas = async (): Promise<Marca[]> => {
  const response = await auth_fetch(`${API_URL}/marca`, { method: 'GET', credentials: 'include' })
  if (!response.ok) throw new Error('Error al obtener las marcas')
  return response.json()
}

// Crear una marca
export const createMarca = async (marca: Marca): Promise<MarcaResponse> => {
  const response = await auth_fetch(`${API_URL}/marca`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(marca),
  })
  if (!response.ok) throw new Error('Error al crear la marca')
  return response.json()
}

// Editar una marca
export const updateMarca = async (id: string, data: { nombre: string; descripcion?: string }) => {
  const response = await auth_fetch(`${API_URL}/marca/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Error al actualizar la marca')
  return response.json() // esto devuelve solo la marca actualizada
}

// Eliminar una marca
export const deleteMarca = async (id: string): Promise<void> => {
  const response = await auth_fetch(`${API_URL}/marca/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  if (!response.ok) throw new Error('Error al eliminar la marca')
}

