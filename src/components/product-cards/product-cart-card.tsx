import { CartProductDetail } from "@/lib/definitions"
import { addPunctuationToPrice, productCountDown, productCountUp } from "@/lib/utils"
import Image from "next/image"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import clsx from "clsx"
import Link from "next/link"

type ProductCartCardPropTypes = {
  product: CartProductDetail,
  setTotalPrice: Dispatch<SetStateAction<number>>,
  dollarBlue: number,
}

export default function ProductCartCard({ product, setTotalPrice, dollarBlue }: ProductCartCardPropTypes) {

  const { title, id, amount, thumbnail, currency_id, price, initial_quantity } = product
  const dollarPriceToPeso = price * dollarBlue

  const [amountState, setAmountState] = useState(amount)

  let total: number
  if (currency_id === 'USD') {
    total = amountState * dollarPriceToPeso
  } else {
    total = amountState * price
  }

  const modifiedPrice = addPunctuationToPrice(`${price}`)
  const modifiedTotal = addPunctuationToPrice(`${total}`)
  const isMaxed = (amountState === initial_quantity)

  useEffect(() => {
    setTotalPrice((prev: number) => prev + total)
  }, [])

  return (
    <div
      className="flex border-2
      m-2 p-2 rounded-md bg-white 
      border-[#a8a8a8]"
    >
      <Image
        src={thumbnail}
        alt={title}
        width={100}
        height={100}
      />

      <div className="flex flex-col justify-evenly w-full ml-2 px-2 py-3 border-l border-[#a8a8a8] truncate">
        <Link 
          href={`/products/${id}`}
          className="text-lg line-clamp-1 truncate max-w-fit"
        >
          {title}
        </Link>
        <div className="flex flex-col md:flex-row md:w-[40vw]
        justify-between md:items-center">
          <p className="md:w-2/5 ">
            {`${currency_id} $${modifiedPrice} C/u`}
          </p>
          <p className="md:self-auto md:w-1/5 text-center items-center">
            {`=>`}
          </p>
          <p className="flex items-center md:self-end md:w-2/5 text-xl">
            {`ARS $${modifiedTotal} subtotal`}
          </p>
        </div>
        <p>{`Disp.: ${initial_quantity}`}</p>
      </div>

      {(initial_quantity > 1) && (
        <div className="flex flex-col min-h-full w-2 mr-2 justify-evenly items-center">
          <button
            className={clsx(`
            h-6 w-6 rounded-full  text-white 
            flex justify-center items-center`,
              isMaxed ? 'cursor-not-allowed bg-gray-700' : 'bg-green-800'
            )}
            onClick={() => {
              productCountUp(amountState, setAmountState, initial_quantity);
              (currency_id === 'USD') 
              ? setTotalPrice((prev: number) => prev + dollarPriceToPeso)
              : setTotalPrice((prev: number) => prev + price)
            }}
          >
            +
          </button>
          <p>{amountState}</p>
          <button
            className={clsx(`h-6 w-6 rounded-full text-white flex 
          justify-center items-center`,
              (amountState === 1) ? 'cursor-not-allowed bg-gray-700' : 'bg-red-800'
            )}
            onClick={() => {
              productCountDown(amountState, setAmountState);
              (currency_id === 'USD')
              ? setTotalPrice((prev: number) => prev - dollarPriceToPeso)
              : setTotalPrice((prev: number) => prev - price)
            }}
          >
            -
          </button>
        </div>
      )}

    </div>
  )
}