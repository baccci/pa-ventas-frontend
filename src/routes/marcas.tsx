import { createFileRoute } from '@tanstack/react-router'
import { MarcaScreen } from '@/features/marca/components/marca-screen'

export const Route = createFileRoute('/marcas')({
  component: MarcaScreen,
})
