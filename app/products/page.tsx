import ProductList from "@/components/ProductList";

export default async function Products() {
  return (
    <>
      <section className="mt-10 text-center flex flex-col items-center justify-center gap-10">
        <h2 className='font-bold text-2xl'>Productos</h2>
        <ProductList />
      </section>
    </>
  )
}
