export type AuthUser = {
	id: string
	email: string
	name: string
	image: string | null // El campo es 'null' en el ejemplo
	emailVerified: boolean
	createdAt: string
	updatedAt: string
}

export type AuthData = {
	redirect: boolean
	token: string
	user: AuthUser
}

// Define el tipo principal para la respuesta de autenticación
export type AuthResponse = {
	response: AuthData
}
