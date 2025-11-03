import type React from 'react'
import { Card } from '@/components/card'
import { ProductCard } from '@/components/product-card'
import { useDateFilter } from '../context/date-filter-context'
import { useSales } from '../hook/use-sales'

type ProductSalesProps = React.ComponentProps<'div'>

export const ProductSales: React.FC<ProductSalesProps> = () => {
	const { startDate, endDate } = useDateFilter()
	const { sales, isLoading, isError } = useSales(startDate, endDate)

	const salesArray = Array.from(sales.values())

	return (
		<Card title="Ventas por producto">
			{isError && <div>Error al cargar las ventas</div>}
			{isLoading && <div>Cargando...</div>}
			{!isLoading && salesArray.length === 0 && <div>No hay ventas</div>}
			{salesArray.map((sale) => (
				<ProductCard key={sale.productName} {...sale} />
			))}
		</Card>
	)
}
