import { useMutation } from '@tanstack/react-query'
import { loginService } from '../services/post-usuario'

export interface LoginVariables {
	email: string
	password: string
}

export function useUser() {
	const usersQuery = useMutation({
		mutationFn: ({ email, password }: LoginVariables) =>
			loginService(email, password),
	})

	return {
		...usersQuery,
	}
}
