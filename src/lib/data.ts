import { CartProduct, Product, ProductDetail } from "./definitions"
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

export async function getDollarBlue() {
  const res = await fetch(`https://dolarapi.com/v1/dolares/blue`)
  if (!res.ok) {
    throw new Error('fallo de fetch de valor dólares')
  }

  const json = await res.json()

  return json['compra'] as number
}

export async function dollarBlueToPesos(productPrice: number) {
  const dollarBlue = await getDollarBlue()

  return addPunctuationToPrice(`${productPrice * dollarBlue}`)

}

async function saveCart(items: CartProduct[]) {
  localStorage.setItem('cart', JSON.stringify(items))
}

export async function getCart() {
    let c = localStorage.getItem('cart')    
    if (!c) return undefined
    
    let cart: CartProduct[] = JSON.parse(c)
    return cart


}

export async function searchCart(item: string) {
  let cart = await getCart()
  if (cart) {
    let product = cart.find(p => p.id === item)
    if (product) {
      return product
    }
  }
}

export async function addToCart(item: string, amount: number) {
  let p: CartProduct = { id: item, amount: amount }
  let cart = await getCart()
  console.log(cart)
  if (cart) {
    cart.unshift(p)
  } else {
    cart = [p]
  }

  saveCart(cart)
}

export async function removeFromCart(item: string) {
  try {
    let cart = await getCart()
    if (cart) {
      let index = cart.findIndex(p => p.id === item)
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