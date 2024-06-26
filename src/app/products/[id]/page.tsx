
type ProductParams = {
  id: string;
}

export default function Page({
  params
}: {
  params: ProductParams
}) {

  const { id } = params

  return (
    <div>
      <p>rer {id}</p>
    </div>
  )
}