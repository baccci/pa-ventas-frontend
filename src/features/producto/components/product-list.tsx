'use client'

import { Ring } from '@uiball/loaders'
import { useProductContext } from '../hook/productos'
import { ConditionalRender } from '@/components/conditional-render'

export const ProductList: React.FC = () => {
  const { data, isLoading, isError } = useProductContext()
  const products = data?.items || []
  const emptyTable = products.length === 0

  const ProductListContentLoader = withLoading(ProductListContent)

  if (isError) {
    return <div className="p-4 text-red-600">Error al cargar los productos.</div>
  }

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-4">
        Lista de Productos ({products.length})
      </h2>

      <ProductListContentLoader isLoading={isLoading} emptyTable={emptyTable} products={products} />
    </div>
  )
}

const ProductListContent: React.FC<{
  emptyTable: boolean
  products: any[]
}> = ({ emptyTable, products }) => {
  return (
    <ConditionalRender condition={!emptyTable}>
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">Nombre</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Precio</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-2">{p.nombre}</td>
                <td className="px-4 py-2">{p.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Mostrando {products.length} producto(s)
      </p>
    </ConditionalRender>
  )
}

function withLoading<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return (props: P & { isLoading: boolean }) => {
    const { isLoading, ...rest } = props

    if (isLoading) {
      return (
        <div className="w-full flex justify-center pt-10">
          <Ring color="#6b46c1" size={25} />
        </div>
      )
    }

    return <WrappedComponent {...(rest as P)} />
  }
}
