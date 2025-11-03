import { useQuery } from '@tanstack/react-query'
import { getProductsService } from '../services/get-productos'

export function useGetProducts(from?: Date, to?: Date) {
	return useQuery({
		queryKey: ['productos', from?.toISOString(), to?.toISOString()],
		queryFn: () => getProductsService(from, to),
	})
}
