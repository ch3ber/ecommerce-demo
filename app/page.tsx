import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import { subtitle, title } from "@/components/primitives";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import ProductList from "@/components/ProductList";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const { data: { user } } = await supabase.auth.getUser();

  return (
    <>
      <section className="text-center py-8 md:py-10">
        <h1 className={title()}>Demo de <span className={title({ color: 'violet' })}>E-commerce </span>con NextJs y Supabase</h1>
        <h2 className={subtitle()}>Catálogo de productos, agendar citas en calendario de google y sistema de pagos con tarjeta visa.</h2>
        <p className="mt-10 mb-3">Inicia sesión con tu cuenta de Google para poder agendar una cita y realizar tu pago.</p>
        <div className="flex gap-4 justify-center mb-10">
          <Button as={Link} color="primary" variant="shadow" href="/calendar">
            Agendar cita
          </Button>
          {
            user
              ? <LogoutButton />
              : <LoginButton />
          }
        </div>
      </section>

      <section className="mt-10 text-center flex flex-col items-center justify-center gap-10">
        <h2 className='font-bold text-2xl'>Productos</h2>
        <ProductList />
      </section>
    </>
  );
}
