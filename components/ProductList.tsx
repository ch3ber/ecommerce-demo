import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import Stripe from "stripe";
import Product from "./Product";

export default async function ProductList() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_TOKEN, {
    apiVersion: '2023-08-16'
  })
  const { data } = await stripe.products.list()
  console.log(data)

  return (
    <ul className="flex flex-col md:flex-row gap-10">
      {
        data.map((product: any) => (
          <Product
            id={product.id}
            priceId={product.default_price}
            src={product.images[0]}
            name={product.name}
            price={product.price}
            key={product.id}
          />
        ))
      }
    </ul>
  )
}
