import axios from 'axios'
import { Marca } from '../types/marca'
import { env } from '@/lib/env'

const API_URL = env.BACKEND_URL || 'http://localhost:3000'
const marcasApiUrl = (`${API_URL}/marca`)

export const createMarca = async (marca: Marca) => {
  const res = await axios.post<Marca>(marcasApiUrl, marca)
  return res.data
}

export const getMarcas = async () => {
  const res = await axios.get<Marca[]>(marcasApiUrl)
  return res.data
}
