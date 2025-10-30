export type ProductResponse = {
  items: Product[]
  links: Links
}

export type Product = {
  nombre: string
  descripcion?: string
  marcaXLineaId: string
  precio: number
  stock: number
}

export type Links = {
  first: string
  previous: string
  next: string
  last: string
}