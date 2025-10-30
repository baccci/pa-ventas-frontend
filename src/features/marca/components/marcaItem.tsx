import { useState } from 'react'
import { Marca } from '../types/marca'
import { useUpdateMarca, useDeleteMarca } from '../hooks/useMarca'
import { FormMarca } from './FormMarca'

interface MarcaItemProps {
  marca: Marca
}

export const MarcaItem = ({ marca }: MarcaItemProps) => {
  const [editing, setEditing] = useState(false)
  const updateMutation = useUpdateMarca()
  const deleteMutation = useDeleteMarca()

  const handleDelete = () => {
    if (!marca.id) return
    if (confirm(`¿Eliminar la marca ${marca.nombre}?`)) {
      deleteMutation.mutate(marca.id)
    }
  }

  const handleUpdate = (updatedData: Marca) => {
    if (!marca.id) return // evita pasar undefined al mutate
    updateMutation.mutate({ id: marca.id, data: updatedData })
    setEditing(false)
  }

  return (
    <div className="p-4 border rounded shadow flex flex-col gap-2">
      {editing ? (
        <FormMarca
          initialData={marca} // garantizamos que nunca sea undefined
          onCancel={() => setEditing(false)}
          onSuccess={() => handleUpdate(marca)} // ahora coincide perfectamente con la firma
        />
      ) : (
        <>
          <h2 className="font-semibold text-lg">{marca.nombre}</h2>
          {marca.descripcion && (
            <p className="text-sm text-gray-600">{marca.descripcion}</p>
          )}

          <div className="flex gap-2 mt-2">
            <button
              className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={() => setEditing(true)}
            >
              Editar
            </button>
            <button
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleDelete}
            >
              Eliminar
            </button>
          </div>
        </>
      )}
    </div>
  )
}
