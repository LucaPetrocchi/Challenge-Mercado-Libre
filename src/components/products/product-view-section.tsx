import { fetchProduct, getDollarBlue, searchCart } from "@/lib/data";
import ProductView from "./product-view";


type ProductViewSectionPropTypes = {
  productId: string;
}

export default async function ProductViewSection({ productId }: ProductViewSectionPropTypes) {

  const prod = fetchProduct(productId)
  const dollarBlue = getDollarBlue()

  return (
    <>
      <ProductView prod={prod} dollar={dollarBlue} />
    </>
  )


}