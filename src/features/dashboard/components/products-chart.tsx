import React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { Card } from '@/components/card'
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/chart'
import { useMonthlySales } from '../hook/useMonthlySales'
import { ChartWrapper } from './chart-wrapper'

type ProductsChartProps = React.ComponentProps<'div'>

export const ProductsChart: React.FC<ProductsChartProps> = () => {
	const { monthlySales, isLoading, isError, isEmpty } = useMonthlySales()

	// Transform monthly sales to chart data format
	const chartData = React.useMemo(() => {
		return monthlySales.map((sale) => {
			// Format month name: capitalize first letter
			const monthLabel =
				sale.month.charAt(0).toUpperCase() + sale.month.slice(1)
			return {
				month: monthLabel,
				totalSales: sale.totalSales,
				totalRevenue: sale.totalRevenue,
			}
		})
	}, [monthlySales])

	// Create chart config
	const chartConfig = React.useMemo<ChartConfig>(() => {
		return {
			totalSales: {
				label: 'Ventas Totales',
				color: '#2563eb', // Blue color
			},
		} satisfies ChartConfig
	}, [])

	return (
		<Card title="Ventas mensuales" className="max-w-1/2">
			<ChartWrapper
				isError={isError}
				isLoading={isLoading}
				empty={isEmpty}
				errorMessage="Error al cargar las ventas"
				loadingMessage="Cargando..."
				emptyMessage="No hay datos de ventas disponibles"
			>
				<ChartContainer config={chartConfig} className="min-h-[400px] w-full">
					<BarChart
						accessibilityLayer
						data={chartData}
						margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							angle={-45}
							textAnchor="end"
							height={80}
						/>
						<ChartTooltip content={<ChartTooltipContent />} />
						<Bar
							dataKey="totalSales"
							radius={4}
							name="Ventas Totales"
							fill="var(--color-totalSales)"
							barSize={80}
						/>
					</BarChart>
				</ChartContainer>
			</ChartWrapper>
		</Card>
	)
}
