'use client'

import { useState } from 'react'
import { FormProducto } from './form-producto'
import { ProductList } from './product-list'
import { GlobalHeader } from '@/components/global-header'
import { Wrapper } from '@/components/wrapper'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/button'
import { ProductProvider } from '../hook/productos'

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
      <div className="">
            <Wrapper
              globalHeader={
                <GlobalHeader title="SalesManager">
                  <Button
                    onClick={toggleForm}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                  >
                    Nuevo Producto
                  </Button>
                </GlobalHeader>
              }
            >
              <PageHeader
                title="Gestión de Productos"
                description="Administra tu inventario de productos"
              />
              {/* 📦 Lista de productos */}
              <ProductProvider>
                <ProductList />
              </ProductProvider>
            </Wrapper>
      </div>

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
