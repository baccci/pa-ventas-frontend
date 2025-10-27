'use client'

import { useState } from 'react'
import { FormProducto } from './form-producto'
import { ProductList } from './product-list'

export default function ProductoScreen() {
  const [mostrarFormProducto, setMostrarFormProducto] = useState(false)

  const handleProductSuccess = (producto: any) => {
    console.log('Producto creado:', producto)
    setMostrarFormProducto(false)
  }

  const toggleForm = () => {
    setMostrarFormProducto(true)
  }

  return (
    <div className="relative p-8">
      {/* 🏷️ Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Gestión de Producto</h1>

        <div className="flex gap-2">
          <button
            onClick={toggleForm}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Crear Nuevo Producto
          </button>
        </div>
      </div>

      {/* 📦 Lista de productos */}
      <ProductList />

      {/* 🧾 Modal del formulario de producto */}
      {mostrarFormProducto && (
        <>
          {/* Fondo oscuro */}
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-40"
            onClick={() => setMostrarFormProducto(false)} // Cierra si clickeás afuera
          />

          {/* Contenedor del formulario */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl relative"
              onClick={(e) => e.stopPropagation()} // Evita cerrar si se clickea adentro
            >
              <FormProducto
                onCancel={() => setMostrarFormProducto(false)}
                onSuccess={handleProductSuccess}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
