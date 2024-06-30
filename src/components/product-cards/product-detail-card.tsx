import { ProductDetail } from "@/lib/definitions";
import ImageCarousel from "../ImageCarousel";
import { dollarBlueToPesos } from "@/lib/data";
import { addPunctuationToPrice } from "@/lib/utils";

type ProductDetailCardPropTypes = {
  product: ProductDetail
}

export default async function ProductDetailCard({ product }: ProductDetailCardPropTypes) {

  let priceInPesos: string | undefined
  if (product.currency_id === 'USD') {
    priceInPesos = await dollarBlueToPesos(product.price)
  }

  let modifiedPrice = addPunctuationToPrice(`${product.price}`)

  return (
    <>
      <div
        className="w-11/12 m-2 p-4
      flex flex-col items-center justify-center bg-white border 
      rounded-xl border-[#a8a8a8]"
      >

        <div
          className="flex w-11/12 md:flex-row flex-col my-6"
        >
          <div className="flex grow">
            <ImageCarousel images={product.pictures} />
          </div>

          <div
            className="flex flex-col self-start justify-center
          border border-gray-300 
          w-full rounded-xl md:ml-12 mt-6 p-2"
          >
            <h1 className="text-xl">{product.title}</h1>

            <div className="flex justify-between items-center">
              <p
                className="text-lg my-4"
              >{`${product.currency_id} $${modifiedPrice}`}</p>
              {priceInPesos && (
                <>
                  <p className="text-gray-600">
                    {`=>`}
                  </p>
                  <p className="text-gray-600">
                    {`ARS $${priceInPesos}`}
                  </p>
                </>
              )}
            </div>
            <button
              className="bg-[#3483fa] border text-white w-full h-12
            self-center rounded-xl p-1"
            >
              Añadir al carrito
            </button>
          </div>

        </div>

        <h1
          className="text-2xl self-start"
        >
          Descripción:
        </h1>

        <p
          className="text-gray-800 m-2"
        >
          {product.description}
        </p>

      </div>

    </>
  )
}