
import { addToCart } from "@/lib/data"
import { ProductDetail } from "@/lib/definitions"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { productCountDown, productCountUp } from "@/lib/utils"
import clsx from "clsx"

type CartModalPropTypes = {
  product: ProductDetail,
  closeDialog: () => void,
}

export default function CartModal({ product, closeDialog }: CartModalPropTypes) {

  const { id, initial_quantity } = product

  const [count, setCount] = useState(1)
  const isMaxed = (count === initial_quantity)
  const isMoreThanOne = (initial_quantity > 1)

  const { refresh } = useRouter()

  return (
    <div
      className="relative z-[1] w-full h-full p-4 gap-4 flex flex-col 
 justify-center items-center rounded-xl
 bg-white border border-[#a8a8a8] overflow-visible"
    >

      <button
        className="absolute z-20 h-8 w-8 -top-4 -right-4
      rounded-full bg-zinc-300 border border-gray-500 font-mono justify-center items-center"
      >
        <p
          className="text-2xl"
          onClick={closeDialog}
        >
          x
        </p>
      </button>

      <div className="flex flex-col gap-1 justify-center items-center">
        <p className="text-xl">
          {(isMoreThanOne) ? '¿Cuántos querés?' : '¿Estás seguro?'}
        </p>

        {isMoreThanOne && <p className="text-xs">
          {`(Podés pedir hasta ${initial_quantity})`}
        </p>}
      </div>
      {isMoreThanOne &&
        <div className="flex w-full justify-evenly items-center">
          <button
            className={clsx(`
          h-8 w-8 rounded-full  text-white 
          flex justify-center items-center`,
              isMaxed ? 'cursor-not-allowed bg-gray-700' : 'bg-green-800'
            )}
            onClick={() => {
              productCountUp(count, setCount, initial_quantity)
            }}
          >
            <p>+</p>
          </button>

          <p>{count}</p>

          <button
            className={clsx(`h-8 w-8 rounded-full text-white flex 
          justify-center items-center`,
              (count === 1) ? 'cursor-not-allowed bg-gray-700' : 'bg-red-800'
            )}
            onClick={() => {
              productCountDown(count, setCount)
            }}
          >
            <p>-</p>
          </button>
        </div>

      }
      <button
        onClick={() => {
          addToCart(id, count)
          closeDialog()
          refresh()
        }}
        className="bg-[#3483fa] border text-white h-10
      self-center rounded-xl w-full"
      >
        Añadir
      </button>
    </div>
  )
}