'use client'

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent } from "react"
import { useDebouncedCallback } from "use-debounce"
import { useHandleSearch } from "@/lib/utils"

export default function Search() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const {replace} = useRouter()
  const handleSearch = useHandleSearch()
  // const handleSearch = useDebouncedCallback((term?: string) => {
  //   const params = new URLSearchParams(searchParams)
  //   params.set('page', '1')
  //   if (term) {
  //     params.set('query', term)
  //   } else {
  //     params.delete('query')
  //   }
  //   replace(`${pathname}?${params.toString()}`)
    
  // }, 300)

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