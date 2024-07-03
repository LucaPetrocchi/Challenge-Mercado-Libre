import ProductResultCard from "../product-cards/product-result-card"
import { Product } from "@/lib/definitions"
import { use } from 'react'
import Pagination from "./pagination"

type ResultsPropTypes = {
  prod: Promise<{
    products: Product[],
    totalResults: number,
  }>,
  page?: string
}

export default function Results({ prod, page }: ResultsPropTypes) {
  const { products, totalResults } = use(prod)

  return (
    <>
      {products.map((prod, id) => {
        return (
          <ProductResultCard key={`${prod.title}-${id}`} product={prod} />
        )
      })}
      {page && <Pagination currentPage={page} totalResults={totalResults} />}
    </>

  )
}