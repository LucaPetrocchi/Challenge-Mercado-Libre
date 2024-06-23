import { Product } from "./definitions"

export async function searchProducts(query?: string) {

  const res = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
  if (!res.ok) {
    throw new Error('fallo de fetch de producto')
  }
  const json = await res.json()
  return json['results'] as Product[]

}

export async function fetchProduct(id: string) {
  try {
    const res = await fetch(`https://api.mercadolibre.com/items/${id}`)
    if (!res.ok) {
      throw new Error('fallo de fetch de producto')
    }
    return res.json()
  } catch (error) {
    console.error('Error al buscar datos del producto')
  }
}

