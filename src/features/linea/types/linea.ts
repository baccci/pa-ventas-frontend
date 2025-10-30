export interface Linea {
  id?: number
  nombre: string
  descripcion?: string
  marcaIds?: string[]
}

export type LineaResponse = {
  items: Linea[]
  links: Links
}

export type Links = {
  first: string
  previous: string
  next: string
  last: string
}