import { searchProducts } from "@/lib/data"
import ProductResultCard from "../product-cards/product-result-card"

type ResultsProps = {
  string: string
}

export default async function Results({string}: ResultsProps) {
  const products = await searchProducts(string)

  return (
    <div>
    { products.map((prod, id) => {
      return (
        <ProductResultCard key={`${prod.title}-${id}`} product={prod} />
      )
    })}
  </div>

  )
}