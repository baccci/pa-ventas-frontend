import { useQuery } from '@tanstack/react-query'
import { getProductsService } from '../services/get-productos'

export function useGetProducts() {
	return useQuery({
		queryKey: ['productos'],
		queryFn: getProductsService,
	})
}
