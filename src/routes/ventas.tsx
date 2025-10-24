import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ventas')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/ventas"!</div>
}
