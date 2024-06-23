import { searchProducts } from "@/lib/data"
import ProductResultCard from "../product-cards/product-result-card"
import { Product } from "@/lib/definitions"
import { use } from 'react'
import { Suspense } from "react"
type ResultsProps = {
  string: string,
  prod: Promise<Product[]>
}

export default function Results({ string, prod }: ResultsProps) {
  const products = use(prod)

  return (
      <div>
        {products.map((prod, id) => {
          return (
            <ProductResultCard key={`${prod.title}-${id}`} product={prod} />
          )
        })}
      </div>

  )
}