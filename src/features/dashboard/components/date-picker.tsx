'use client'

import { ChevronDownIcon } from 'lucide-react'
import type React from 'react'

import { Button } from '@/components/button'
import { Calendar } from '@/components/calendar'
import { Label } from '@/components/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover'

type DatePickerProps = React.ComponentProps<'div'> & {
	label: string
	date: Date | undefined
	setDate: (date: Date | undefined) => void
	open: boolean
	setOpen: (open: boolean) => void
}

export function DatePicker({
	label,
	date,
	setDate,
	open,
	setOpen,
}: DatePickerProps) {
	return (
		<div className="flex flex-col gap-3">
			<Label htmlFor="date" className="px-1">
				{label}
			</Label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className="w-48 justify-between font-normal"
					>
						{date ? date.toLocaleDateString() : 'Seleccionar fecha'}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto overflow-hidden p-0" align="start">
					<Calendar
						mode="single"
						selected={date}
						captionLayout="dropdown"
						onSelect={(date) => {
							setDate(date)
							setOpen(false)
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}
