// src/features/producto/components/ProductoScreen.tsx
import { useState } from 'react'
import { FormMarca } from '@/features/marca'
import { FormLinea } from '@/features/linea'
import { FormProducto } from '../components/FormProducto'
import { useProductContext } from '../hook/productos'

export default function ProductoScreen() {
  const { data, isLoading, isError } = useProductContext()
  const products = data?.items || [] //Extrae la lista de productos
  // const emptyTable = data?.items.length === 0
  const [mostrarFormMarca, setMostrarFormMarca] = useState(false)
  const [mostrarFormLinea, setMostrarFormLinea] = useState(false)
  const [mostrarFormProducto, setMostrarFormProducto] = useState(false);

  if (isLoading) {
    return <div className="p-8">Cargando productos...</div>
  }

  if (isError) {
    return <div className="p-8 text-red-600">Error al cargar los productos.</div>
  }

  const handleSuccess = (producto: any) => {
    console.log('Producto creado:', producto);
    setMostrarFormProducto(false);
    // 💡 Aquí podrías llamar a la invalidación de la caché de TanStack Query si fuera necesario
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Gestión de Producto</h1>

      {/* Botón para mostrar/ocultar Formulario de Marca */}
      <button
        onClick={() => setMostrarFormMarca((prev) => !prev)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
      >
        {mostrarFormMarca ? 'Ocultar Formulario de Marca' : 'Mostrar Formulario de Marca'}
      </button>

      {/* Botón para mostrar Formulario de Línea */}
      <button
        onClick={() => setMostrarFormLinea((prev) => !prev)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {mostrarFormLinea ? 'Ocultar Formulario de Línea' : 'Mostrar Formulario de Línea'}
      </button>

      {/* Formulario de Marca */}
      {mostrarFormMarca && (
        <div className="mt-6">
          <FormMarca
            onCancel={() => setMostrarFormMarca(false)}
            onSuccess={(marca) => {
              console.log('Marca creada:', marca)
              setMostrarFormMarca(false)
            }}
          />
        </div>
      )}

      {/* Formulario de Línea */}
      {mostrarFormLinea && (
        <div className="mt-6">
          <FormLinea
            onCancel={() => setMostrarFormLinea(false)}
            onSuccess={(linea) => {
              console.log('Línea creada:', linea)
              setMostrarFormLinea(false)
            }}
          />
        </div>
      )}

      {/* 4. Lista de Productos (Se oscurece/oculta si el formulario está activo) */}
        <div className={mostrarFormProducto ? 'opacity-20 pointer-events-none' : ''}>
          <h2 className="text-xl font-bold mb-4">Lista de Productos ({products.length})</h2>
          
          {products.length > 0 ? (
            // ... (Tu código de la tabla) ...
            <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    {/* ... Thead ... */}
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                            <tr key={product.nombre + product.marca}> 
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.nombre}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.marca}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.linea}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.precio.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          ) : (
            <p>No se encontraron productos.</p>
          )}
        </div>

        {/* 🛑 Formulario de Producto (Superpuesto) */}
        {mostrarFormProducto && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-10">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg border border-gray-300">
              <FormProducto
                onCancel={() => setMostrarFormProducto(false)}
                onSuccess={handleSuccess}
                // Aquí pasarías los hooks o datos necesarios para las marcas/líneas
              />
            </div>
          </div>
        )}
      </div>
  )
}

