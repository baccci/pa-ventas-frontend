import { useState } from 'react'

type UseDateFilterStateReturn = {
	// Input dates (temporary, what user is selecting)
	inputStartDate: Date | undefined
	inputEndDate: Date | undefined
	setInputStartDate: (date: Date | undefined) => void
	setInputEndDate: (date: Date | undefined) => void
	// Applied filter dates (what triggers refetch)
	startDate: Date | undefined
	endDate: Date | undefined
	// Function to apply the filters (triggered by button)
	applyFilters: () => void
}

export function useDateFilterState(): UseDateFilterStateReturn {
	const [inputStartDate, setInputStartDate] = useState<Date | undefined>(
		undefined,
	)
	const [inputEndDate, setInputEndDate] = useState<Date | undefined>(undefined)
	const [startDate, setStartDate] = useState<Date | undefined>(undefined)
	const [endDate, setEndDate] = useState<Date | undefined>(undefined)

	const applyFilters = () => {
		setStartDate(inputStartDate)
		setEndDate(inputEndDate)
	}

	return {
		inputStartDate,
		inputEndDate,
		setInputStartDate,
		setInputEndDate,
		startDate,
		endDate,
		applyFilters,
	}
}
