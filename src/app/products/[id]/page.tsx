import Loading from "@/app/loading";
import ProductView from "@/components/products/product-view";
import ProductViewSection from "@/components/products/product-view-section";
import { fetchProduct } from "@/lib/data";
import { Suspense } from "react";

type ProductParams = {
  params: { id: string }
}

export default function Page({ params }: ProductParams) {

  const { id } = params

  return (
    <>
      <Suspense key={JSON.stringify(params)} fallback={<Loading />}>
        <ProductViewSection productId={id} />
      </Suspense>
    </>
  )
}