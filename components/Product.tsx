'use client'
import { Card, CardFooter, Image, Button } from "@nextui-org/react";

type ProductProps = {
  src: string;
  name: string;
  price: string;
  id: string;
  priceId: string;
}

export default function Product({ src, name, price, id, priceId }: ProductProps) {

  const buyProduct = async () => {
    const url = new URL(window.location.href)
    const { origin } = url
    const full_url = `/api/checkout-products`

    const res = await fetch(full_url, {
      method: 'POST',
      body: JSON.stringify({ id, priceId }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await res.json()
    window.location.href = data.url
  }

  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none"
    >
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={200}
        src={src}
        width={200}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-white/80">{name}</p>
        <p className="text-tiny text-white/60">{price}</p>
        <Button onClick={() => buyProduct()} className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
          Comprar
        </Button>
      </CardFooter>
    </Card>
  )
}
