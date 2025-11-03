export type VentaResponse = {
	id: string
	fecha: Date | null
	usuarioId: string
	cuil: string
	createdAt: Date
	updatedAt: Date
	deletedAt: Date | null
	cliente: ClienteResponse
	usuario: UsuarioResponse
	detalleVenta: DetalleVentaResponse[]
}

export type ClienteResponse = {
	cuil: string
	nombre: string
	apellido: string
	telefono: string | null
	email: string
	createdAt: Date
	updatedAt: Date
	deletedAt: Date | null
}

export type UsuarioResponse = {
	id: string
	name: string
	email: string
	emailVerified: boolean
	role: 'USER' | 'ADMIN'
	image: string | null
	createdAt: Date
	updatedAt: Date
	deletedAt: Date | null
}

export type DetalleVentaResponse = {
	id: string
	ventaId: string
	productoId: string
	cantidad: number
	precioUnitario: number
	createdAt: Date
	updatedAt: Date
	deletedAt: Date | null
	producto: ProductoResponse
}

export type ProductoResponse = {
	id: string
	nombre: string
	descripcion: string | null
	precio: number
	stock: number
	marcaXLineaId: string
	createdAt: Date
	updatedAt: Date
	deletedAt: Date | null
}

// Paginated response (when user is NOT admin)
export type VentasPaginatedResponse = {
	items: VentaResponse[]
	total: number
}

// Array response (when user IS admin)
export type VentasArrayResponse = VentaResponse[]

// Union type for findAll return value
export type VentasResponse = VentasPaginatedResponse | VentasArrayResponse

// Helper type guard to check if response is paginated
export function isPaginatedResponse(
	response: VentasResponse,
): response is VentasPaginatedResponse {
	return 'items' in response && 'total' in response
}
