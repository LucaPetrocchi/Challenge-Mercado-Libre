import Image from "next/image"
import Logo from "../../../public/logo.png"
import Search from "./search"
import { ShoppingCartIcon } from "@heroicons/react/24/outline"

export default function Navbar() {


  return (
    <nav className="
      w-100 flex
      bg-[#ffe600] text-white py-3 px-3
      justify-evenly items-center relative
    ">
        <a
          className="absolute left-4"
          href="/"
        >
          <Image
            src={Logo}
            alt="Mercado Libre"
            
          />
        </a>
      <div className="flex justify-center flex-grow">
        <Search />
      </div>
      <div className="absolute right-4">

        <a
          className="flex flex-row p-1 
        justify-center items-center 
        bg-yellow-400 rounded-lg"
          href="/cart"
        >
          <ShoppingCartIcon
            className="h-[35px] w-[35px] text-white"
          />
        </a>
      </div>
    </nav>
  )
}