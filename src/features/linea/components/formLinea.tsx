import { useState } from 'react'
import { useCreateLinea } from '../hooks/useLinea'
import { useMarcas } from '@/features/marca/hooks/useMarca'

interface FormLineaProps {
  onSuccess?: (linea: any) => void
  onCancel?: () => void
}

export const FormLinea = ({ onSuccess, onCancel }: FormLineaProps) => {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState<string[]>([])

  const mutation = useCreateLinea()
  const { data: marcas, isLoading } = useMarcas()

  const toggleMarca = (id: string | number) => {
    const idStr = String(id)
    setMarcasSeleccionadas(prev =>
      prev.includes(idStr) ? prev.filter(x => x !== idStr) : [...prev, idStr]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const linea = await mutation.mutateAsync({
        nombre,
        descripcion,
        marcaIds: marcasSeleccionadas.length ? marcasSeleccionadas : undefined,
      })
      onSuccess?.(linea)
      setNombre('')
      setDescripcion('')
      setMarcasSeleccionadas([])
    } catch (err) {
      console.error('Error creando línea:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md w-full max-w-md">
      <div className="mb-2">
        <label>Nombre*</label>
        <input
          required
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div className="mb-2">
        <label>Descripcion</label>
        <input
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div className="mb-2">
        <label>Marcas</label>
        {isLoading ? (
          <div>Cargando marcas...</div>
        ) : (
          <div className="border rounded p-2 max-h-32 overflow-y-auto">
            {(marcas || []).map((marca: any) => (
              <label key={String(marca.id)} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={marcasSeleccionadas.includes(String(marca.id))}
                  onChange={() => toggleMarca(marca.id)}
                />
                {marca.nombre}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {mutation.isPending ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  )
}
