export interface Marca {
  id?: string
  nombre: string
  descripcion?: string
}

export type MarcaResponse = {
  items: Marca[]
  links: Links
}

export type Links = {
  first: string
  previous: string
  next: string
  last: string
}