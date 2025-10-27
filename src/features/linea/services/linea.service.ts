import axios from 'axios'
import { env } from '@/lib/env'
import { Linea } from '../types/linea'

const API_URL = env.BACKEND_URL || 'http://localhost:3000'
const lineasApiUrl = (`${API_URL}/linea`)

export const createLinea = async (linea: Linea) => {
  const { data } = await axios.post(lineasApiUrl, linea)
  return data
}

export const getLineas = async () => {
  const res = await axios.get<Linea[]>(lineasApiUrl)
  return res.data
}