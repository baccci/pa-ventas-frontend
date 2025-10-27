import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Product, ProductResponse } from '../types/types'
import { postProductsService } from '../services/post-productos'

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation<ProductResponse, Error, Product>({
    mutationFn: ({ nombre, stock, precio, marca, linea, descripcion }: Product) => postProductsService(nombre, stock, precio, marca, linea, descripcion),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

