import ResultsSection from "@/components/home/results-section";
import Suggestions from "@/components/home/suggestions";
import { fetchProduct, searchProducts } from "@/lib/data";
import { Product } from "@/lib/definitions";
import { Suspense } from "react";
import Loading from "./loading";
import { redirect } from "next/navigation";
import Pagination from "@/components/home/pagination";

type HomeParams = {
  page: string | undefined,
  query: string | undefined,
}

export default function Home({
  searchParams
}: {
  searchParams: HomeParams
}) {

  const { page, query } = searchParams
  const exampleTerms = [
    'computadoras',
    'autos',
    'remeras',
    'electrodomésticos',
    'comida',
  ]

  const randint = Math.floor(Math.random() * exampleTerms.length)

  if (!query) {
    redirect(`/?page=1&query=${exampleTerms[randint]}`)
  }

  return (
    <div className="min-w-full flex flex-col items-center
      space-y-3">
      <Suggestions
        examples={exampleTerms}
        query={query}
      />

      <div>
        <Suspense key={JSON.stringify(searchParams)} fallback={<Loading />}>
          <ResultsSection page={page} query={query} />
        </Suspense>
      </div>

    </div>

  );
}
