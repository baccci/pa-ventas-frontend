import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/button'
import { GlobalHeader } from '@/components/global-header'
import { IconBox } from '@/components/icons/icon-box'
import { IconChart } from '@/components/icons/icon-chart'
import { PageHeader } from '@/components/page-header'
import { Wrapper } from '@/components/wrapper'

export const Route = createFileRoute('/')({ component: App })

function App() {
	return (
		<div className="">
			<Wrapper
				globalHeader={
					<GlobalHeader title="SalesManager">
						<Button>
							<IconBox width={16} /> Productos
						</Button>
						<Button variant="outline">
							<IconChart width={16} />
							Ventas
						</Button>
					</GlobalHeader>
				}
			>
				<PageHeader
					title="Dashboard de Ventas"
					description="Resumen general de productos y ventas"
				/>
			</Wrapper>
		</div>
	)
}
