import { env } from '@/lib/env'
import type { AuthResponse } from '../types/types'

export async function loginService(user: string, password: string): Promise<AuthResponse> {
  try {
    const backendUrl = env.backend.URL || 'http://localhost:3000'

    const productsApiUrl = new URL(`${backendUrl}/api/auth/sign-in/email`)

    const response = await fetch(productsApiUrl.toString(), {
      method: 'POST',
      body: JSON.stringify({ user, password }),
      headers: {
        'Content-Type': 'application/json'
      }, 
      credentials: 'include'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user')
    }

    const data = await response.json()
    return data as AuthResponse
  } catch {
    throw new Error('Failed to fetch user')
  }
}