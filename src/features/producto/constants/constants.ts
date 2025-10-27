export const PRODUCTS_DATA = {
  NOMBRE: 'nombre',
  MARCA: 'marca',
  LINEA: 'linea',
  PRECIO: 'precio',
  STOCK: 'stock'
} as const

export const FORM_FIELD_ERRORS = {
  precio: {
    min: 'El precio debe ser mayor a $0.00',
    max: 'El precio máximo es de $1,000,000.00',
    required: 'El precio es requerido'
  },
  peso: {
    min: 'El stock debe ser mayor a 0',
    max: 'El stock máximo es de 10,000',
    required: 'El stock es requerido'
  },
  descripcion: {
    maxLength: 'La descripción no puede superar los 100 caracteres'
  }
}

export const PRODUCTS_LIMITS = {
  precio: {
    min: 0,
    max: 1000000
  },
  stock: {
    min: 0,
    max: 10000
  },
  descripcion: {
    maxLength: 100,
  }

}