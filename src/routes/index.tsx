import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { GlobalHeader } from '@/components/global-header'
import { IconBox } from '@/components/icons/icon-box'
import { IconChart } from '@/components/icons/icon-chart'
import { PageHeader } from '@/components/page-header'
import { Wrapper } from '@/components/wrapper'
import Filters from '@/features/dashboard/components/filters'
import { useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
	const { navigate } = useRouter();

	return (
		<div className="">
			<Wrapper
				globalHeader={
					<GlobalHeader title="SalesManager">
						<Button onClick={() => navigate({ to: '/productos' })}>
							<IconBox width={16} />
							Productos
						</Button>
						<Button variant="outline">
							<IconChart width={16} />
							Ventas
						</Button>
						<Button onClick={() => navigate({ to: '/marcas' })}>
							<IconBox width={16} />
							Marcas
						</Button>
					</GlobalHeader>
				}
			>
				<PageHeader
					title="Dashboard de Ventas"
					description="Resumen general de productos y ventas"
				/>
				<Filters />
				<div className="flex justify-between gap-4">
					<Card title="Ventas por producto">asf</Card>
					<Card title="Ventas Mensuales">asf</Card>
				</div>
			</Wrapper>
		</div>
	)
}
