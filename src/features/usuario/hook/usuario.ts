import { useMutation  } from '@tanstack/react-query'
import { loginService } from '../services/get-usuario'

export interface LoginVariables {
  user: string;
  password: string;
}

export function useUser() {
  const usersQuery = useMutation({
    mutationFn: ({ user, password }: LoginVariables) => loginService(user, password),
  })

  return {
    ...usersQuery

  }
}
