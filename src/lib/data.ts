import { Product, ProductDetail } from "./definitions"
import { addPunctuationToPrice } from "./utils"

export async function searchProducts(query?: string, page?: number) {
  let limit = 20
  let fetchString = `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=${limit}`
  if (page && page > 1) {
    fetchString += `&offset=${page * limit}`
  }
  const res = await fetch(fetchString)
  if (!res.ok) {
    throw new Error('fallo de fetch de producto')
  }
  const json = await res.json()
  return {
    products: json['results'] as Product[],
    totalResults: json['paging'].total as number
  }

}

async function fetchProductDescription(id: string) {
  const fetchString = `https://api.mercadolibre.com/items/${id}/description`
  const res = await fetch(fetchString)
  if (!res.ok) {
    throw new Error('Fallo de fetch de descripción de producto')
  }
  const json = await res.json()
  return json['plain_text'] as string
}

export async function fetchProduct(id: string) {
    const fetchString = `https://api.mercadolibre.com/items/${id}`
    const res = await fetch(fetchString)
    if (!res.ok) {
      throw new Error('fallo de fetch de producto')
    }
    const json: ProductDetail = await res.json()
    json.description = await fetchProductDescription(id)
    return {
      product: json
    }
}

async function getDollarBlue() {
  const res = await fetch(`https://dolarapi.com/v1/dolares/blue`)
  if (!res.ok) {
    throw new Error('fallo de fetch de valor dólares')
  }

  const json = await res.json()

  return {
    dollarBlue: json['compra'] as number
  }
}

export async function dollarBlueToPesos(productPrice: number) {
  const { dollarBlue } = await getDollarBlue()
  
  return addPunctuationToPrice(`${productPrice * dollarBlue}`)
  
}

async function saveCart(items: string[]) {
  localStorage.setItem('cart', JSON.stringify(items))
}

export async function getCart() {
  try {
    let c = localStorage.getItem('cart')
    if (c) {
      let cart: string[] = JSON.parse(c)
      return cart
    } else {
      throw new Error('No hay carrito guardado')
    }
  } catch (error) {
    console.error(error)
  }
}

export async function addToCart(item: string) {
  let cart = await getCart()
  if (cart) {
    cart.unshift(item)
  } else {
    cart = [item]
  }

  saveCart(cart)
}

export async function removeFromCart(item: string) {
  try {
    let cart = await getCart()
    if (cart) {
      let index = cart.indexOf(item)
      if (index >= 0) {
        cart.splice(index, 1)
        saveCart(cart)
      } else {
        throw new Error('No existe ítem para borrar')
      }
    } else {
      throw new Error('No hay carrito guardado')
    }
  } catch (error) {
    console.error(error)
  }
}