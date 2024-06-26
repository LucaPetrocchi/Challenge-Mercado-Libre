'use client'
import { useHandlePageChange } from "@/lib/hooks"
import { useMemo } from "react"
import clsx from "clsx"

type PaginationPropTypes = {
  currentPage: string,
  totalResults: number,
}

export default function Pagination({ currentPage, totalResults }: PaginationPropTypes) {
  const handlePageChange = useHandlePageChange()
  const current = parseInt(currentPage)

  const totalPages = useMemo(
    () => (totalResults < 1000)
      ? Math.floor(totalResults / 20)
      : 49,
    [totalResults]
  )

  // 49 x 20 == 980 
  // the maximum offset allowed with a limit of 20 
  // (w/ public API)

  const calculatePagesToDisplay = (current: number, max: number) => {
    return [
      current - 3,
      current - 2,
      current - 1,
      current,
      current + 1,
      current + 2,
      current + 3,
    ].filter((n: number) => n > 0 && n <= max)
  }

  const pageButtons = calculatePagesToDisplay(current, totalPages)

  return (
    <div className="flex flex-row justify-center">
      {(current > 1) && <button
          onClick={() => handlePageChange(current-1)}
        >
        {'<'}
      </button>}
      {pageButtons.map((n) => {
        return (
          <button
            key={`pageButton${n}`}
            className={clsx(
              'mx-2',
              (n === current) && 'text-gray-400 cursor-not-allowed'
            )}
            onClick={() => handlePageChange(n)}
          >
            {n}
          </button>
        )
      })}
      {(current < totalPages) && <button
        onClick={() => handlePageChange(current+1)}
      >
        {'>'}
      </button>}
    </div>
  )
}