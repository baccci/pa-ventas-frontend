import type React from 'react'
import { cn } from '@/lib/utils'

type ProductCardProps = React.ComponentProps<'div'> & {
	productName: string
	productBrand: string
	salesAmount: number
	profitAmount: number
}

export const ProductCard: React.FC<ProductCardProps> = ({
	productName,
	productBrand,
	salesAmount,
	profitAmount,
	className,
	...props
}) => {
	return (
		<div
			className={cn(
				'flex justify-between items-center p-3 bg-gray-50 rounded-lg',
				className,
			)}
			{...props}
		>
			<div className="flex items-center space-x-3">
				<img
					className="w-10 h-10 rounded-lg object-cover"
					src="https://storage.googleapis.com/uxpilot-auth.appspot.com/51a9052267-89a2bd005d891285bf93.png"
					alt="smartphone product"
				/>
				<div>
					<p className="font-medium text-gray-900">{productName}</p>
					<p className="text-sm text-gray-500">{productBrand}</p>
				</div>
			</div>
			<div className="text-right">
				<p className="font-semibold text-gray-900">${profitAmount}</p>
				<p className="text-sm text-gray-500">{salesAmount} ventas</p>
			</div>
		</div>
	)
}
