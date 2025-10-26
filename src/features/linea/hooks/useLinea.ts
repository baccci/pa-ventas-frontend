import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createLinea, Linea } from '../services/linea.service'

export const useCreateLinea = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (linea: Linea) => createLinea(linea),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lineas'] })
    },
  })
}
