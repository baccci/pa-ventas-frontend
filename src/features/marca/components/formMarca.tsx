import { useState, useEffect } from 'react'
import { useCreateMarca, useUpdateMarca } from '../hooks/useMarca'
import type { Marca } from '../services/marca.service'

interface FormMarcaProps {
  initialData?: Marca
  onSuccess?: () => void
  onCancel?: () => void
}

export const FormMarca = ({ initialData, onSuccess, onCancel }: FormMarcaProps) => {
  const [nombre, setNombre] = useState(initialData?.nombre || '')
  const [descripcion, setDescripcion] = useState(initialData?.descripcion || '')
  const createMutation = useCreateMarca()
  const updateMutation = useUpdateMarca()

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre)
      setDescripcion(initialData.descripcion || '')
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (initialData?.id) {
        await updateMutation.mutateAsync({ id: initialData.id, data: { nombre, descripcion } })
      } else {
        await createMutation.mutateAsync({ nombre, descripcion })
      }
      onSuccess?.()
    } catch (err) {
      console.error('Error al guardar la marca', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        required
        className="border px-2 py-1 rounded"
      />
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
        className="border px-2 py-1 rounded"
      />
      <div className="flex gap-2">
        <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded">
          {initialData ? 'Guardar cambios' : 'Crear'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-3 py-1 bg-gray-300 rounded">
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
