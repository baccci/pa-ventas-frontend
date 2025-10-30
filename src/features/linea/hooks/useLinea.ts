import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createLinea } from '../services/linea.service'
import { useQuery } from '@tanstack/react-query'
import { getLineas } from '../services/linea.service'
import { Linea } from '../types/linea'

export const useCreateLinea = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (linea: Linea) => createLinea(linea),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lineas'] })
    },
  })
}

export const useLinea = () => {
  return useQuery<Linea[]>({
    queryKey: ['lineas'],
    queryFn: getLineas,
  })
}


