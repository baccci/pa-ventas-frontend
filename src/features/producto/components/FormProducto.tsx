import React, { useState } from 'react';
// Asumo que tienes hooks para obtener las listas de Marca y Linea
import { useMarcas } from '@/features/marca/hook/use-marcas'; 
import { useLineas } from '@/features/linea/hook/use-lineas'; 
// Asumo que tienes un hook de mutación para crear productos
import { useCreateProduct } from '../hook/use-create-product'; 

interface FormProductoProps {
  onSuccess: (producto: any) => void;
  onCancel: () => void;
}

export const FormProducto: React.FC<FormProductoProps> = ({ onSuccess, onCancel }) => {
  const { data: marcas, isLoading: loadingMarcas } = useMarcas();
  const { data: lineas, isLoading: loadingLineas } = useLineas();
  const createMutation = useCreateProduct(); // Hook de mutación para POST

  const [formData, setFormData] = useState({
    nombre: '',
    precio: 0,
    stock: 0,
    lineaId: '',
    marcaId: '',
    descripcion: '',
  });

  // 🛑 Estado para mostrar el formulario inline de creación de Marca/Línea
  const [showMarcaCreator, setShowMarcaCreator] = useState(false);
  const [showLineaCreator, setShowLineaCreator] = useState(false);

  // ... (Funciones de manejo de cambios y validación)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 1. Validación de precio/stock (>= 0)
    if (formData.precio < 0 || formData.stock < 0) {
        alert("Precio y Stock deben ser mayores o iguales a 0.");
        return;
    }

    // 2. Ejecutar la mutación
    createMutation.mutate(formData, {
      onSuccess: (newProduct) => {
        onSuccess(newProduct);
      },
      onError: (error) => {
        console.error("Error al crear producto:", error);
        alert("Fallo la creación del producto.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl font-semibold mb-4">Crear Nuevo Producto</h3>
      {/* ... (Campos Nombre, Precio, Stock, Descripción) ... */}
      
      {/* Selector de Marca */}
      <label className="block mb-4">
        Marca:
        <select
          value={formData.marcaId}
          // ... (handler)
          disabled={loadingMarcas}
        >
          <option value="">Seleccione una Marca</option>
          {marcas?.items.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
        </select>
        {/* Botón para crear nueva marca inline */}
        <button type="button" onClick={() => setShowMarcaCreator(true)}> + Nueva Marca </button>
      </label>
      
      {/* Formulario inline de Creación de Marca (si está activo) */}
      {showMarcaCreator && (
        <div className="p-2 border rounded mb-4">
          {/* Aquí integrarías el FormMarca de manera simplificada o modal */}
        </div>
      )}

      {/* Selector de Línea (similar a Marca) */}
      {/* ... */}

      <div className="mt-4 flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
        <button 
          type="submit" 
          className="bg-purple-600 text-white px-4 py-2 rounded"
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? 'Creando...' : 'Guardar Producto'}
        </button>
      </div>
    </form>
  );
};