import { useMarcas } from '../hooks/useMarca'
import { MarcaItem } from './marcaItem'

interface Marca {
  id: string
  nombre: string
  descripcion?: string
}

export const MarcaScreen = () => {
  const {
    data: marcas = [],
    isLoading,
    isError,
  } = useMarcas() as {
    data: Marca[]
    isLoading: boolean
    isError: boolean
  }

  if (isLoading)
    return <div className="p-4">Cargando marcas...</div>

  if (isError)
    return <div className="p-4 text-red-600">Error al cargar las marcas.</div>

  if (marcas.length === 0)
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Listado de Marcas</h1>
        <div>No hay marcas registradas.</div>
      </div>
    )

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Listado de Marcas</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {marcas.map((marca) => (
          <MarcaItem key={marca.id} marca={marca} />
        ))}
      </div>
    </div>
  )
}