import { Product } from "@/lib/definitions"
import Image from "next/image"
import Link from "next/link"
import { addPunctuationToPrice } from "@/lib/utils"

type ProductResultCardPropTypes = {
  product: Product
}

export default function ProductResultCard({ product }: ProductResultCardPropTypes) {
  
  let { id, thumbnail, title, currency_id, price } = product

  let modifiedPrice = addPunctuationToPrice(`${price}`)

  return (
    <Link 
      className="flex flex-row border-2
      m-2 p-2 rounded-md bg-white 
      border-[#a8a8a8]"
      href={`/products/${id}`}
    >
      <div className="flex justify-center items-center min-w-28">
        <Image 
          src={thumbnail}
          alt={title}
          width={100}
          height={100}
        />
      </div>

      <div className="flex flex-col justify-between w-full ml-2 px-2 py-3 border-l border-[#a8a8a8]">
        <p className="text-lg line-clamp-1">{title}</p>
        <p className="text-2xl">{`${currency_id} $${modifiedPrice}`}</p>
      </div>

    </Link>
  )
}