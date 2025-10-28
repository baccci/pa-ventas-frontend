import { createFileRoute } from '@tanstack/react-router'
import { useUser } from '@/features/usuario/hook/usuario'

export const Route = createFileRoute('/login')({
	component: RouteComponent,
})

function RouteComponent() {
	const { data, mutate, isSuccess, isPending } = useUser()

	function handleLogin() {
		console.log('handleLogin')
		mutate({ email: 'a@a.com', password: 'password123' })
	}

	return (
		<div className="flex flex-col gap-4 w-full h-screen justify-center items-center">
			<button
				type="button"
				onClick={handleLogin}
				className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold"
			>
				{isPending ? 'Logging in...' : 'Login'}
			</button>
			<div>
				{isSuccess && data && (
					<div>
						<h2>Login Successful!</h2>
						<p>Token: {data.token}</p>
						<p>User: {data.user.name}</p>
						<p>Email: {data.user.email}</p>
					</div>
				)}
			</div>
		</div>
	)
}
