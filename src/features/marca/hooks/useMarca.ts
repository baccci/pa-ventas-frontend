import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getMarcas, createMarca, updateMarca, deleteMarca, Marca } from '../services/marca.service'

// Listar marcas
export const useMarcas = () => useQuery({ queryKey: ['marcas'], queryFn: getMarcas })

// Crear marca
export const useCreateMarca = () => {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: (marca: Marca) => createMarca(marca), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['marcas'] }) })
}

// Editar marca
export const useUpdateMarca = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { nombre: string; descripcion?: string } }) =>
      updateMarca(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['marcas'] }),
  })
}


// Eliminar marca
export const useDeleteMarca = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteMarca(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['marcas'] }), // <- igual
  })
}
