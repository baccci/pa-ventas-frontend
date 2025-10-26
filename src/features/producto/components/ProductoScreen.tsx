// src/features/producto/components/ProductoScreen.tsx
import { useState } from 'react'
import { FormMarca } from '@/features/marca'
import { FormLinea } from '@/features/linea'

export default function ProductoScreen() {
  const [mostrarFormMarca, setMostrarFormMarca] = useState(false)
  const [mostrarFormLinea, setMostrarFormLinea] = useState(false)

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
    </div>
  )
}

