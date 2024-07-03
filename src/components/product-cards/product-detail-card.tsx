'use client'

import { ProductDetail } from "@/lib/definitions";
import ImageCarousel from "../ImageCarousel";
import { addPunctuationToPrice } from "@/lib/utils";
import { useDialog } from "../Dialog";
import { addToCart, searchCart } from "@/lib/data";
import { useEffect, useState } from "react";
import CartModal from "../CartModal";


type ProductDetailCardPropTypes = {
  product: ProductDetail,
  dollarBlue?: number,
}

export default function ProductDetailCard({ product, dollarBlue }: ProductDetailCardPropTypes) {

  const splitDesc = product.description.split(/\r?\n/)

  const { dialogRef, toggleDialog, Dialog } = useDialog()

  const [isInCart, setIsInCart] = useState(false)

  useEffect(() => {
    searchCart(product.id)
    .then(id => {
      setIsInCart(id ? true : false)
    })
  }, [product])

  let priceInPesos: string | undefined
  if (product.currency_id === 'USD' && dollarBlue) {
    priceInPesos = addPunctuationToPrice(`${dollarBlue * product.price}`)
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
          <div className="flex grow min-w-[45vw]">
            <ImageCarousel images={product.pictures} />
          </div>

          <div
            className="flex flex-col shrink self-start justify-center
          border border-gray-300 
          w-full rounded-xl md:ml-12 mt-6 p-2 gap-1"
          >
            <h1 className="text-xl">{product.title}</h1>

            {product.initial_quantity > 0
              ? (<p>
                {`Cantidad disponible: ${product.initial_quantity}`}
              </p>)
              : (<p
                className="text-red-600"
              >
                ¡No disponible!
              </p>)
            }

            <div className="flex justify-between items-center">
              <p
                className="text-2xl my-4"
              >
                {`${product.currency_id} $${modifiedPrice}`}
              </p>
              {priceInPesos && (
                <>
                  <p className="text-gray-600">
                    {`=>`}
                  </p>
                  <p className="text-gray-600" suppressHydrationWarning={true}>
                    {`ARS $${priceInPesos}`}
                  </p>
                </>
              )}
            </div>
            {(isInCart)
              ? (
                <p
                  className="self-center p-2"
                >¡Ya está en tu carrito!</p>
              )
              : (
                <button
                  className="bg-[#3483fa] border text-white 
                w-full h-12 self-center rounded-xl p-1"
                  onClick={() => {
                    toggleDialog()
                  }}
                >
                  Añadir al carrito
                </button>
              )}
          </div>

        </div>

        {product.description && (
          <div className="w-full text-wrap break-words">
            <h1
              className="text-2xl self-start"
            >
              Descripción:
            </h1>

            {splitDesc.map((line, i) => {
              return (
                <p
                  key={`line${i}`}
                  className="text-gray m-2"
                >
                  {line}
                </p>
              )
            })}

          </div>
        )}

      </div>

      <Dialog
        ref={dialogRef}
        toggleDialog={toggleDialog}
      >
        <CartModal product={product} closeDialog={toggleDialog} />
      </Dialog>

    </>
  )
}