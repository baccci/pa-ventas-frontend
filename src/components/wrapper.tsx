import type React from 'react'
import { cn } from '@/lib/utils'

type WrapperProps = React.ComponentProps<'div'> & {
	globalHeader: React.ReactNode
}

export const Wrapper: React.FC<WrapperProps> = ({
	className,
	children,
	globalHeader,
	...props
}) => {
	return (
		<div
			className={cn(
				'flex flex-col w-full h-full min-h-screen justify-center items-center',
				className,
			)}
			{...props}
		>
			<div className="flex flex-col rounded-lg border-2 border-[#d1d5db] lg:min-w-[80%] overflow-hidden">
				{globalHeader}
				<div className="p-6 bg-[#F9FAFB] w-full">{children}</div>
			</div>
		</div>
	)
}
