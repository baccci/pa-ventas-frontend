import type React from 'react'
import { cn } from '@/lib/utils'

type PageHeaderProps = React.ComponentProps<'div'> & {
	title: string
	description: string
}

export const PageHeader: React.FC<PageHeaderProps> = ({
	title,
	description,
	className,
	...props
}) => {
	return (
		<div className={cn('mb-6', className)} {...props}>
			<h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
			<p className="text-gray-600">{description}</p>
		</div>
	)
}
