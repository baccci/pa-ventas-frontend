'use client'

import { FilterIcon } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { DatePicker } from './date-picker'

export default function Filters() {
	const {
		startDate,
		endDate,
		startDateOpen,
		endDateOpen,
		setStartDate,
		setEndDate,
		setStartDateOpen,
		setEndDateOpen,
	} = useFiltersState()

	return (
		<Card title="Filtros">
			<div className="flex gap-2 items-end">
				<DatePicker
					label="Fecha de inicio"
					date={startDate}
					setDate={setStartDate}
					open={startDateOpen}
					setOpen={setStartDateOpen}
				/>
				<DatePicker
					label="Fecha de fin"
					date={endDate}
					setDate={setEndDate}
					open={endDateOpen}
					setOpen={setEndDateOpen}
				/>
				<Button>
					<FilterIcon width={16} /> Filtrar
				</Button>
			</div>
		</Card>
	)
}

function useFiltersState() {
	const [startDate, setStartDate] = React.useState<Date | undefined>(undefined)
	const [endDate, setEndDate] = React.useState<Date | undefined>(undefined)
	const [startDateOpen, setStartDateOpen] = React.useState(false)
	const [endDateOpen, setEndDateOpen] = React.useState(false)

	return {
		startDate,
		endDate,
		startDateOpen,
		endDateOpen,
		setStartDate,
		setEndDate,
		setStartDateOpen,
		setEndDateOpen,
	}
}
