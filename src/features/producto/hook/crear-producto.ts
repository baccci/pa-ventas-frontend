import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Product, ProductResponse } from '../types/types'
import { postProductsService } from '../services/post-productos'

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation<ProductResponse, Error, Product>({
    mutationFn: ({ nombre, stock, precio, marcaXLineaId, descripcion }: Product) => postProductsService(nombre, stock, precio, marcaXLineaId, descripcion),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

