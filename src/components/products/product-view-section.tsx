import { fetchProduct } from "@/lib/data";
import ProductView from "./product-view";


type ProductViewSectionPropTypes = {
  productId: string;
}

export default function ProductViewSection({ productId }: ProductViewSectionPropTypes) {

  const prod = fetchProduct(productId)

  return (
    <>
      <ProductView prod={prod} />
    </>
  )


}