import { createFileRoute } from '@tanstack/react-router'
import { ProductoScreen } from '@/features/producto'
import { ProductProvider } from '@/features/producto/hook/productos'

export const Route = createFileRoute('/productos')({
  // Modificamos el componente para usar una función que envuelva ProductoScreen
  component: () => (
    <ProductProvider>
      <ProductoScreen />
    </ProductProvider>
  ),
})