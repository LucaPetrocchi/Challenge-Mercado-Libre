'use client'

import { useEffect, useReducer, useState } from "react"
import { CartProductDetail } from "@/lib/definitions"
import { fetchProduct, getCart, getDollarBlue } from "@/lib/data"
import Loading from "../loading"
import ProductCartCard from "@/components/product-cards/product-cart-card"
import { addPunctuationToPrice } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useDialog } from "@/components/Dialog"

export default function CartPage() {
  const { refresh } = useRouter()

  const { dialogRef, Dialog, toggleDialog } = useDialog()

  const [isLoading, setIsLoading] = useState(true)
  const [cart, setCart] = useState<CartProductDetail[] | undefined>()
  const [dollarBlue, setDollarBlue] = useState(0)
  const [total, setTotal] = useState(0)

  const modifiedTotal = addPunctuationToPrice(`${total}`)
  const dollarProductPrices = cart?.filter(
    (c) => c.currency_id === 'USD'
  ).map((c) => c.price)

  useEffect(() => {
    const getProductsFromCart = async () => {
      let c = await getCart()
      if (!c) {
        setIsLoading(false)
        return
      }
      let fetched: CartProductDetail[] = await Promise.all(
        c.map(async (p) => {
          let { product } = await fetchProduct(p.id)
          let cpd: CartProductDetail = {
            ...p, ...product
          }
          return cpd
        })
      )
      if (fetched) setCart(fetched)
      setIsLoading(false)
    }

    const dollarValue = async () => {
      let d = await getDollarBlue()
      setDollarBlue(d)
    }

    getProductsFromCart()
    dollarValue()
  }, [])

  return (
    <div
      className="w-11/12 m-2 p-4
      flex items-center justify-between bg-white border 
      rounded-xl border-[#a8a8a8]"
    >
      {(!isLoading && typeof cart === 'undefined')
        ? (
          <div className="h-full w-full flex items-center">
            <p className="text-zinc-500">No hay nada en tu carrito</p>
          </div>
        )
        : (
          <>
            <div
              className="flex flex-col w-[60vw]"
            >
              {!isLoading && cart
                ? cart.map((p) => {
                    return (
                      <ProductCartCard
                        product={p}
                        setTotalPrice={setTotal}
                        dollarBlue={dollarBlue}
                      />
                    )
                  })
                : <div className="min-w-full flex items-center justify-center">
                    <Loading />
                  </div>
              }
            </div>

            <div
              className="flex flex-col self-start justify-center
                border border-gray-300 
                w-2/6 rounded-xl ml-12 p-2 m-2 gap-1"
            >
              <div className="flex w-full items-center justify-between">
                <p className="self-start">Tu total es:</p>
                <div className="flex flex-col items-end">
                  <p className="text-xl">{`ARS $${modifiedTotal}`}</p>
                  {(dollarProductPrices && dollarProductPrices.length > 0) &&
                    <p className="text-zinc-500">
                      {`USD $${addPunctuationToPrice(`${dollarProductPrices}`)}`}
                    </p>
                  }
                </div>
              </div>
              <button
                className="bg-[#3483fa] border text-white h-10
                  self-center rounded-xl w-full mt-2"
                onClick={() => {
                  toggleDialog()
                  setTimeout(() => {
                    localStorage.removeItem('cart')
                    refresh()
                  }, 1000)
                }}
              >
                Finalizar compra
              </button>
            </div>


            <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
              <div
                className="relative z-[1] w-full h-full p-4 gap-4 flex flex-col 
                justify-center items-center rounded-xl
                bg-white border border-[#a8a8a8] overflow-visible"
              >
                <p>¡Éxito!</p>
              </div>
            </Dialog>


          </>
        )
      }
    </div>
  )
}