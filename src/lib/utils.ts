import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export const useHandleSearch = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const params = new URLSearchParams(searchParams)
  const { replace } = useRouter()
  const handleSearch = useDebouncedCallback((term?: string) => {
    params.set('page', '1')
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)

  }, 500)

  return handleSearch
}

export const useHandlePagination = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const params = new URLSearchParams(searchParams)
  const { replace } = useRouter()
  const handlePagination = useDebouncedCallback((targetPage?: number) => {
    const query = params.get('query')
    if (targetPage && query) {
      params.set('page', `${targetPage}`)
    }
    replace(`${pathname}?${params.toString()}`)
  }, 500)

  return handlePagination
}