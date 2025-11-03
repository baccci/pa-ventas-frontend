import { useMemo } from 'react'
import { useGetProducts } from './use-products'

type MonthlySale = {
	month: string
	monthNumber: number
	year: number
	totalSales: number
	totalRevenue: number
}

export function useMonthlySales(from?: Date, to?: Date) {
	const { data, isLoading, isError } = useGetProducts(from, to)

	const monthlySales = useMemo(() => {
		const salesByMonth = new Map<string, MonthlySale>()
		const responseIsArray = Array.isArray(data)

		if (data && responseIsArray) {
			data.forEach((sale) => {
				if (!sale.fecha) return

				const saleDate = new Date(sale.fecha)
				const month = saleDate.toLocaleString('es-ES', { month: 'long' })
				const monthNumber = saleDate.getMonth()
				const year = saleDate.getFullYear()
				const monthKey = `${year}-${monthNumber}`

				// Calculate total sales and revenue for this sale
				const saleTotal = sale.detalleVenta.reduce(
					(acc, detail) => {
						acc.quantity += detail.cantidad
						acc.revenue += detail.cantidad * detail.precioUnitario
						return acc
					},
					{ quantity: 0, revenue: 0 },
				)

				const existingMonth = salesByMonth.get(monthKey)

				if (existingMonth) {
					existingMonth.totalSales += saleTotal.quantity
					existingMonth.totalRevenue += saleTotal.revenue
				} else {
					salesByMonth.set(monthKey, {
						month,
						monthNumber,
						year,
						totalSales: saleTotal.quantity,
						totalRevenue: saleTotal.revenue,
					})
				}
			})
		}

		// Convert to array and sort by year and month
		return Array.from(salesByMonth.values()).sort((a, b) => {
			if (a.year !== b.year) return a.year - b.year
			return a.monthNumber - b.monthNumber
		})
	}, [data])

	return {
		monthlySales,
		isLoading,
		isError,
		isEmpty: monthlySales.length === 0 && !isLoading && !isError,
	}
}
