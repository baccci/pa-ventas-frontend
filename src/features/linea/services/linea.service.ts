import axios from 'axios'

export interface Linea {
  id?: number
  nombre: string
  descripcion?: string
  marcaIds?: string[]
}

export const createLinea = async (linea: Linea) => {
  const { data } = await axios.post('http://localhost:3000/linea', linea)
  return data
}
