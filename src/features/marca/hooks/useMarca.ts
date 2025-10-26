import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createMarca, getMarcas } from '../services/marca.service'
import { Marca } from '../types/marca'

export const useMarcas = () => {
  return useQuery<Marca[]>({
    queryKey: ['marcas'],
    queryFn: getMarcas,
  })
}

export const useCreateMarca = () => {
  const queryClient = useQueryClient()
  return useMutation<Marca, unknown, Marca>({
    mutationFn: createMarca,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marcas'] })
    },
  })
}
