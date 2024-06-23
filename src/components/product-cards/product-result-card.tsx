import { Product } from "@/lib/definitions"
import Image from "next/image"
import Link from "next/link"

type ProductResultCardProps = {
  product: Product
}

export default function ProductResultCard({ product }: ProductResultCardProps) {
  
  return (
    <div 
      className="flex flex-row border-2
      m-2 p-2 rounded-md bg-white 
      border-[#a8a8a8]"
    >
      <div className="flex items-center min-w-28">
        <Image 
          src={product.thumbnail}
          alt={product.title}
          width={100}
          height={100}
        />
      </div>

      <div className="flex flex-col ml-2 pl-2 border-l border-[#a8a8a8]">
        <p className="text-lg">{product.title}</p>
      </div>

    </div>
  )
}