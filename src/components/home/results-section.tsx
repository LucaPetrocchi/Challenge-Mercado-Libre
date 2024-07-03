import Results from "./results";
import { searchProducts } from '@/lib/data';
import Pagination from "./pagination";

type ResultsSectionPropTypes = {
  page?: string,
  query?: string,
}

export default function ResultsSection({ page, query }: ResultsSectionPropTypes) {
  const prod = searchProducts(
    query,
    (page) ? parseInt(page) : 0
  ) 

  // promise needs to be defined here for suspense to work
  return (
    <>
      <Results prod={prod} page={page} />
    </>
  )
}