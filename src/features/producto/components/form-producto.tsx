

import { useState, useMemo } from 'react'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/button'
import { Label } from '@/components/label'
import { Input } from '@/components/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from '@/components/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover'
import { Linea } from '@/features/linea/types/linea'
import { Marca } from '@/features/marca/types/marca'

// Importar hooks y formularios de otras features
import { useMarcas } from '@/features/marca/hooks/useMarca'
import { useLinea } from '@/features/linea/hooks/useLinea'
import FormMarca from '@/features/marca/components/FormMarca' // Usaremos el componente que proporcionaste
import { FormLinea } from '@/features/linea/components/formLinea' // Usaremos el componente que proporcionaste
import { useCreateProduct } from '../hook/crear-producto'

interface FormProductoProps {
    onSuccess?: (producto: any) => void
    onCancel?: () => void
}

export const FormProducto = ({ onSuccess, onCancel }: FormProductoProps) => {
    
    const createProduct = useCreateProduct()

    const [nombre, setNombre] = useState('')
    const [stock, setStock] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [precio, setPrecio] = useState('')
    const [marca, setMarcaId] = useState('')
    const [linea, setLineaId] = useState('')

    const [isMarcaPopoverOpen, setIsMarcaPopoverOpen] = useState(false)
    const [isLineaPopoverOpen, setIsLineaPopoverOpen] = useState(false)

    const { data: marcas, isLoading: isLoadingMarcas } = useMarcas()
    const { data: lineas, isLoading: isLoadingLineas } = useLinea()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!nombre || !marca || !linea || !stock || !precio) {
            return alert('Todos los campos con * son obligatorios.')
        }

        try {
            const producto = await createProduct.mutateAsync({
                nombre,
                stock: parseInt(stock),
                precio: parseFloat(precio),
                marca,
                linea,
                descripcion: descripcion || undefined,
            })
            onSuccess?.(producto)
            // Resetear formulario
            setNombre('')
            setStock('')
            setPrecio('')
            setMarcaId('')
            setLineaId('')
        } catch (error) {
            console.error('Error al crear producto:', error)
        }
    }

    const marcasOptions = useMemo(() => 
        (marcas as Marca[] | undefined || []).map(m => ({ label: m.nombre, value: String(m.id) }))
    , [marcas])

    const lineasOptions = useMemo(() => 
        ((lineas as Linea[] | undefined) || []).map((l) => ({ 
            label: l.nombre, 
            value: String(l.id) 
        }))
    , [lineas])

    const loading = createProduct.isPending

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl space-y-4 border border-gray-200">
            <h2 className="text-xl font-bold">Registrar Nuevo Producto</h2>

            {/* 1. Campo Nombre */}
            <div className="space-y-1">
                <Label htmlFor="nombre">Nombre *</Label>
                <Input
                    id="nombre"
                    type="text"
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre del producto"
                />
            </div>

            <div className="space-y-1">
                <Label htmlFor="descripcion">Descripción</Label>
                <Input
                    id="descripcion"
                    type="text"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Descripción del producto"
                />
            </div>
            
            {/* 2. Campo Stock y Precio */}
            <div className="flex gap-4">
                <div className="space-y-1 w-1/2">
                    <Label htmlFor="stock">Stock *</Label>
                    <Input
                        id="stock"
                        type="number"
                        required
                        min="0"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        placeholder="Cantidad disponible"
                    />
                </div>
                <div className="space-y-1 w-1/2">
                    <Label htmlFor="precio">Precio *</Label>
                    <Input
                        id="precio"
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        placeholder="0.00"
                    />
                </div>
            </div>

            {/* 3. Selector de Marca con Popover para crear */}
            <div className="space-y-1">
                <div className="flex justify-between items-end mb-1">
                    <Label>Marca *</Label>
                    <Popover open={isMarcaPopoverOpen} onOpenChange={setIsMarcaPopoverOpen}>
                        <PopoverTrigger asChild>
                            <Button type="button" variant="outline" size="sm" disabled={isLoadingMarcas}>
                                <PlusIcon className="size-4" />
                                Nueva Marca
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                            <FormMarca 
                                onSuccess={() => setIsMarcaPopoverOpen(false)}
                                onCancel={() => setIsMarcaPopoverOpen(false)}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                {isLoadingMarcas ? (
                    <div className="text-sm text-gray-500">Cargando marcas...</div>
                ) : (
                    <Select value={marca} onValueChange={setMarcaId}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecciona una marca" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {marcasOptions.map((m) => (
                                    <SelectItem key={m.value} value={m.value}>
                                        {m.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
            </div>

            {/* 4. Selector de Línea con Popover para crear */}
            <div className="space-y-1">
                <div className="flex justify-between items-end mb-1">
                    <Label>Línea *</Label>
                    <Popover open={isLineaPopoverOpen} onOpenChange={setIsLineaPopoverOpen}>
                        <PopoverTrigger asChild>
                            <Button type="button" variant="outline" size="sm" disabled={isLoadingLineas}>
                                <PlusIcon className="size-4" />
                                Nueva Línea
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[450px] p-0">
                            <FormLinea 
                                onSuccess={() => setIsLineaPopoverOpen(false)}
                                onCancel={() => setIsLineaPopoverOpen(false)}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                {isLoadingLineas ? (
                    <div className="text-sm text-gray-500">Cargando líneas...</div>
                ) : (
                    <Select value={linea} onValueChange={setLineaId}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecciona una línea" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {lineasOptions.map((l) => (
                                    <SelectItem key={l.value} value={l.value}>
                                        {l.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
            </div>

            {/* 5. Botones de acción */}
            <div className="flex justify-end gap-2 pt-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Guardando...' : 'Guardar Producto'}
                </Button>
            </div>
        </form>
    )
}