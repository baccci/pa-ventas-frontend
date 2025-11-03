import { createContext } from '@/components/utils/create-context'
import { useDateFilterState } from '../hook/use-date-filter-state'

export const [DateFilterProvider, useDateFilter] =
	createContext<ReturnType<typeof useDateFilterState>>(useDateFilterState)
