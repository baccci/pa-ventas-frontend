import { useState } from 'react'
import { useCreateMarca } from '../hooks/useMarca'

export interface FormMarcaProps {
  onSuccess?: (marca: any) => void
  onCancel?: () => void
}

export default function FormMarca({ onSuccess, onCancel }: FormMarcaProps) {
  const mutation = useCreateMarca()
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nombre.trim()) return alert('El nombre es obligatorio.')

    try {
      const marca = await mutation.mutateAsync({ nombre, descripcion })
      onSuccess?.(marca)
      setNombre('')
      setDescripcion('')
    } catch (error) {
      console.error('Error al crear marca:', error)
    }
  }

  const loading = mutation.status === 'pending'

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow-md w-96 space-y-4"
    >
      <h2 className="text-lg font-semibold">Registrar Marca</h2>

      <div className="flex flex-col">
        <label className="font-medium mb-1">Nombre *</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="font-medium mb-1">Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 resize-none"
          rows={3}
          placeholder="Opcional"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  )
}
