export type Product = {
  id: string,
  title: string,
  price: number,
  currency_id: string,
  thumbnail: string,
}

export type ProductDetail = Product & {
  pictures: Picture[]
}

type Picture = {
  url: string,
  size: string,
  max_size: string,
}

