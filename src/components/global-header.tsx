import type React from 'react'
import { cn } from '@/lib/utils'

type HeaderProps = React.ComponentProps<'header'>

export const GlobalHeader: React.FC<HeaderProps> = ({
	className,
	children,
	title,
	...props
}) => {
	return (
		<header
			className={cn('px-6 py-4 flex  items-center gap-4', className)}
			{...props}
		>
			<h2 className="text-2xl font-bold text-gray-900">{title}</h2>
			{children}
		</header>
	)
}
