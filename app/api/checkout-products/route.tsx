import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)

  // @ts-ignore
  const stripe = new Stripe(process.env.STRIPE_SECRET_TOKEN, {
    apiVersion: '2023-08-16'
  })

  let product
  try {
    product = await request.json()
  } catch (error) {
    console.log(error)
  }

  const strapiSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    success_url: requestUrl.origin + '/',
    line_items: [
      {
        price: product.priceId,
        quantity: 1
      }
    ],
    cancel_url: requestUrl.origin,
  })

  console.log(strapiSession)

  if (!strapiSession.url) {
    return NextResponse.redirect(requestUrl.origin)
  }

  return NextResponse.json({
    url: strapiSession.url,
  })
}
