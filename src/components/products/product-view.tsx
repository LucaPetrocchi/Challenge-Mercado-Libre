import { ProductDetail } from "@/lib/definitions"
import { use } from 'react'
import ProductDetailCard from "../product-cards/product-detail-card"
import { searchCart } from "@/lib/data"

type ProductDetailPropTypes = {
  prod: Promise<{
    product: ProductDetail
  }>,
  dollar: Promise<number>,
}

export default function ProductView({ prod, dollar }: ProductDetailPropTypes) {

  const { product } = use(prod)
  let dollarBlue: number | undefined
  if (product.currency_id === 'USD') {
    dollarBlue = use(dollar)
  }

  return (
    <>
      <ProductDetailCard product={product} dollarBlue={dollarBlue} />
    </>
  )
}