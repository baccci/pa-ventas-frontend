import type React from 'react'
import { cn } from '@/lib/utils'

type CardProps = React.ComponentProps<'div'> & {
	title: React.ReactNode
}

export const Card: React.FC<CardProps> = ({
	className,
	children,
	title,
	...props
}) => {
	return (
		<div
			className={cn(
				'flex flex-col w-full p-6 bg-white rounded-xl border-gray-200 border mb-6',
				className,
			)}
			{...props}
		>
			<h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
			{children}
		</div>
	)
}
