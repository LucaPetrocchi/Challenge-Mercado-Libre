import ResultsSection from "@/components/home/results-section";
import Suggestions from "@/components/home/suggestions";
import { fetchProduct, searchProducts } from "@/lib/data";
import { Product } from "@/lib/definitions";
import { Suspense } from "react";

export default function Home() {

  const exampleTerms = [
    'computadoras',
    'autos',
    'remeras',
    'electrodomésticos',
    'comida',
  ]

  return (
    <div className="min-w-full flex flex-col items-center
      space-y-3">
      <Suggestions
        examples={exampleTerms}
      />

      <div>
        <ResultsSection />

        <section>pagination</section>
      </div>

    </div>

  );
}
