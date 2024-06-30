import { ProductDetail } from "@/lib/definitions"
import { use } from 'react'
import ProductDetailCard from "../product-cards/product-detail-card"

type ProductDetailPropTypes = {
  prod: Promise<{
    product: ProductDetail
  }>
}

export default function ProductView({ prod }: ProductDetailPropTypes) {

  const { product } = use(prod)

  return (
    <>
      <ProductDetailCard product={product} />
    </>
  )
}