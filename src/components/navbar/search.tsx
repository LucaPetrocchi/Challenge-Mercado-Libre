'use client'

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useSearchParams } from "next/navigation"
import { useHandleSearch } from "@/lib/hooks"

export default function Search() {
  const searchParams = useSearchParams()
  const handleSearch = useHandleSearch()


  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      return handleSearch(e.currentTarget.value)
    }
  }

  const handleButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const inputElement = e.currentTarget.previousElementSibling as HTMLInputElement
    return handleSearch(inputElement.value)
  }

  return (
    <div className="flex self-center
     focus-within:border-gray-700 border-[#ffe600]
     border rounded-md mx-auto">
      <label
        htmlFor="search"
        className="sr-only"
      >
        Search
      </label>
      <input
        className="text-black flex flex-grow p-2 rounded-md z-10 outline-none"
        type="text"
        placeholder="Buscar..."
        onKeyDown={handleEnter}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <button
        className="text-white bg-[#3483fa] z-0 ml-[-1rem] pr-3 pl-[1.5rem] rounded-md"
        onClick={handleButton}
      >
        <MagnifyingGlassIcon
          className="h-[18px] w-[18px] text-white"
        />
      </button>
    </div>
  )
}