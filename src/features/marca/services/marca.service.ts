import axios from 'axios'
import { Marca } from '../types/marca'

const API_URL = 'http://localhost:3000/marca'

export const createMarca = async (marca: Marca) => {
  const res = await axios.post<Marca>(API_URL, marca)
  return res.data
}

export const getMarcas = async () => {
  const res = await axios.get<Marca[]>(API_URL)
  return res.data
}
