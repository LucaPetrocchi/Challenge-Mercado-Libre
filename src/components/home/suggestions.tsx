'use client'

import { useHandleSearch } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import clsx from "clsx"

type SuggestionsPropTypes = {
  examples: string[],
  query?: string
}

export default function Suggestions({ examples, query }: SuggestionsPropTypes) {
  const handleSearch = useHandleSearch()

  const handleButton = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const searchValue = e.currentTarget.name
    return handleSearch(searchValue)
  }

  return (
    <div className="w-9/12 md:w-5/12 flex flex-col items-center bg-white py-2 mb-10 rounded-xl border border-[#a8a8a8]">
      <div className="m-2 flex flex-col items-center">
        <h1 className="text-3xl mb-1">
          ¿Con ganas de mirar?
        </h1>
        <h2 className="text-xl">
          Acá tenes unas sugerencias
        </h2>
      </div>
      <div className="w-full flex flex-row flex-wrap justify-center justify-items-stretch">
        {examples.map((e) => {
          return (
            <button
              className={clsx(`m-2 p-2 z-10 relative transition-all
              before:absolute before:bottom-0 before:left-0 
              before:top-0 before:z-0 before:h-full before:w-0
              before:bg-[#3483fa] before:transition-all
              hover:before:left-0 hover:before:w-full duration-500
              border border-[#3483fa] hover:text-white
              rounded-md min-w-32`, 
              (query === e) 
                ? `bg-[#3483fa] text-white cursor-not-allowed`
                : `bg-transparent`
              )
            }
              
              onClick={handleButton}
              key={e}
              name={e}
            >
              <span className="m-2 relative z-10">
                {e}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
