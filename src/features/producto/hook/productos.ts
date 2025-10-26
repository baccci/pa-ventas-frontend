import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getProductsService } from '../services/get-productos'
import { createContext } from '@/components/utils/create-context'

export function useProduct() {
  const productsQuery = useQuery({
    queryKey: ['products', {  }], // Cache keys
    queryFn: () => getProductsService(),
    placeholderData: keepPreviousData
  })

  return {
    ...productsQuery

  }
}

type ProductContextValue = ReturnType<typeof useProduct>

export const [ProductProvider, useProductContext] =
  createContext<ProductContextValue>(() => useProduct())
