import { z } from 'zod'
import { FORM_FIELD_ERRORS, PRODUCTS_DATA, PRODUCTS_LIMITS } from '../constants/constants'

const precioSchema = z
  .number({
    error: FORM_FIELD_ERRORS.precio.required
  })
  .gt(PRODUCTS_LIMITS.precio.min, {
    error: FORM_FIELD_ERRORS.precio.min
  })
  .max(PRODUCTS_LIMITS.precio.max, {
    error: FORM_FIELD_ERRORS.precio.max
  })
const stockSchema = z
  .number({
    error: FORM_FIELD_ERRORS.peso.required
  })
  .min(PRODUCTS_LIMITS.stock.min, {
    error: FORM_FIELD_ERRORS.peso.min
  })
  .max(PRODUCTS_LIMITS.stock.max, {
    error: FORM_FIELD_ERRORS.peso.max
  })

export const productSchema = z.object({
  [PRODUCTS_DATA.PRECIO]: precioSchema,
  [PRODUCTS_DATA.STOCK]: stockSchema
})

export type ProductSchema = z.infer<typeof productSchema>
