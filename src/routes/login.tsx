import { useUser } from '@/features/usuario/hook/usuario'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {

    const { data, mutate } = useUser()
    function handleLogin() {
        mutate({ user: 'a@gmail.com', password: '12345678' })
    }
  return <div>
    <button onClick={handleLogin}>Login</button>
  </div>
}
