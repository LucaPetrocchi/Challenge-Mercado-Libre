import { Suspense } from 'react'
import Results from "./results";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/loading";
import { useHandleSearch } from '@/lib/utils';
import { searchProducts } from '@/lib/data';

type ResultsSectionProps = {
  page?: number,
  query?: string,
}

export default function ResultsSection({ page, query }: ResultsSectionProps) {

  // const handleSearch = useHandleSearch()
  // const exampleTerms = [
  //   'computadoras',
  //   'autos',
  //   'remeras',
  //   'electrodomésticos',
  //   'comida',
  // ]
  // const term = exampleTerms[Math.floor(Math.random() * exampleTerms.length)]

  // const searchParams = useSearchParams()
  // const params = new URLSearchParams(searchParams)
  // const q = params.get('query')
  // const search = (q)
  //   ? q
  //   : handleSearch(term)


  const prod = searchProducts(query)
  return (
    <Results string={``} prod={prod} />
  )
}