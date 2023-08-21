import { createDateInGoogleCalendar } from '@/utils/createDateInGoogleCalendar'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: Request) {
  // fetch products from Stripe
  const stripe = new Stripe(process.env.STRIPE_SECRET_TOKEN, {
    apiVersion: '2023-08-16'
  })

  let products
  let eventData
  try {
    eventData = await request.json()
    products = await stripe.products.list()
  } catch (error) {
    console.log(error)
  }

  // validate products and eventData
  const requestUrl = new URL(request.url)
  if (!products || !eventData) {
    return NextResponse.redirect(requestUrl.origin)
  }

  await createDateInGoogleCalendar(eventData.providerToken, eventData.event)

  // create Stripe session
  const strapiSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    success_url: requestUrl.origin + '/',
    line_items: [
      {
        price: products.data[0].default_price,
        quantity: 1
      }
    ],
    cancel_url: requestUrl.origin,
  })

  // redirect if strapi session could not be created
  if (!strapiSession.url) {
    return NextResponse.redirect(requestUrl.origin)
  }

  return NextResponse.json({
    url: strapiSession.url,
  })
}
