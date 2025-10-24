type Product = {
	id: number
	name: string
}

export async function getProductsService(): Promise<Product[]> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([
				{ id: 1, name: 'Product 1' },
				{ id: 2, name: 'Product 2' },
				{ id: 3, name: 'Product 3' },
			])
		}, 1000)
	})
}
