import type React from 'react'

type ChartWrapperProps = {
	isError?: boolean
	isLoading?: boolean
	empty?: boolean
	errorMessage?: string
	loadingMessage?: string
	emptyMessage?: string
	children: React.ReactNode
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({
	isError = false,
	isLoading = false,
	empty = false,
	errorMessage = 'Error al cargar los datos',
	loadingMessage = 'Cargando...',
	emptyMessage = 'No hay datos disponibles',
	children,
}) => {
	if (isError) {
		return <div className="text-red-500">{errorMessage}</div>
	}

	if (isLoading) {
		return <div>{loadingMessage}</div>
	}

	if (empty) {
		return <div>{emptyMessage}</div>
	}

	return <>{children}</>
}
