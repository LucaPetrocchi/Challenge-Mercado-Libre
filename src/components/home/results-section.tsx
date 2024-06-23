'use client'

import { Suspense } from 'react'
import Results from "./results";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/loading";
import { useHandleSearch } from '@/lib/utils';

export default async function ResultsSection() {

  const handleSearch = useHandleSearch()
  const exampleTerms = [
    'computadoras',
    'autos',
    'remeras',
    'electrodomésticos',
    'comida',
  ]
  const term = exampleTerms[Math.floor(Math.random() * exampleTerms.length)]

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const query = params.get('query')
  const search = (query)
    ? query
    : handleSearch(term)

  if (search) {
    return (
      <Suspense key={search} fallback={<Loading />}>
        <Results string={search} />
      </Suspense>
    )
  }
}