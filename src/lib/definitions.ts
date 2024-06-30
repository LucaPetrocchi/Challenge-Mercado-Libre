export type Product = {
  id: string,
  title: string,
  price: number,
  currency_id: string,
  thumbnail: string,
}

export type ProductDetail = Product & {
  pictures: Picture[],
  initial_quantity: number,
  description: string,
}

export type Picture = {
  url: string,
  size: string,
  max_size: string,
}

