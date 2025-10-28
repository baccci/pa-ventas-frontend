import { useMutation } from '@tanstack/react-query'
import { loginService } from '../services/get-usuario'

export interface LoginVariables {
	email: string
	password: string
}

export function useUser() {
	const usersQuery = useMutation({
		mutationFn: async ({ email, password }: LoginVariables) => {
			return await loginService(email, password)
		},
	})

	return {
		...usersQuery,
	}
}
