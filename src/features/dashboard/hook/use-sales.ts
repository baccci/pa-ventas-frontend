import { useGetProducts } from './use-products'

type Sale = {
	productName: string
	productBrand: string
	salesAmount: number
	profitAmount: number
}

export function useSales(from?: Date, to?: Date) {
	const { data, isLoading, isError } = useGetProducts(from, to)
	const salesPerProduct = new Map<string, Sale>()
	const responseIsArray = Array.isArray(data)

	if (data && responseIsArray) {
		data.forEach((sale) => {
			sale.detalleVenta.forEach((detail) => {
				const productName = detail.producto.nombre
				const saleExist = salesPerProduct.get(productName)

				if (saleExist) {
					saleExist.salesAmount += detail.cantidad
					saleExist.profitAmount += detail.cantidad * detail.producto.precio
					return
				}

				salesPerProduct.set(detail.producto.nombre, {
					productName: detail.producto.nombre,
					productBrand: detail.producto.marcaXLineaId,
					salesAmount: detail.cantidad,
					profitAmount: detail.cantidad * detail.producto.precio,
				})
			})
		})
	}

	return {
		sales: salesPerProduct,
		isLoading,
		isError,
	}
}
