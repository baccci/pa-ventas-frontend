'use client'

import { FilterIcon } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { useDateFilter } from '../context/date-filter-context'
import { DatePicker } from './date-picker'

export default function Filters() {
	const {
		inputStartDate,
		inputEndDate,
		setInputStartDate,
		setInputEndDate,
		applyFilters,
	} = useDateFilter()
	const { startDateOpen, endDateOpen, setStartDateOpen, setEndDateOpen } =
		useFiltersState()

	const handleApplyFilters = () => {
		applyFilters()
	}

	return (
		<Card title="Filtros">
			<div className="flex gap-2 items-end">
				<DatePicker
					label="Fecha de inicio"
					date={inputStartDate}
					setDate={setInputStartDate}
					open={startDateOpen}
					setOpen={setStartDateOpen}
				/>
				<DatePicker
					label="Fecha de fin"
					date={inputEndDate}
					setDate={setInputEndDate}
					open={endDateOpen}
					setOpen={setEndDateOpen}
				/>
				<Button onClick={handleApplyFilters}>
					<FilterIcon width={16} /> Filtrar
				</Button>
			</div>
		</Card>
	)
}

function useFiltersState() {
	const [startDateOpen, setStartDateOpen] = React.useState(false)
	const [endDateOpen, setEndDateOpen] = React.useState(false)

	return {
		startDateOpen,
		endDateOpen,
		setStartDateOpen,
		setEndDateOpen,
	}
}
