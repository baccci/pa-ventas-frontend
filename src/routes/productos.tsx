import { createFileRoute } from '@tanstack/react-router'
import { ProductoScreen } from '@/features/producto'

export const Route = createFileRoute('/productos')({
  component: ProductoScreen,
})
