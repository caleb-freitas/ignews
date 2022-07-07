/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { query as q } from "faunadb"

import { stripe } from "../../services/stripe";
import { faunadb } from "../../services/faunadb";

export type User = {
  ref: {
    id: string
  },
  data: {
    stripe_customer_id: string
  }
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST")
    response.status(405).end("Method now allowed")
  }
  const session = await getSession({ req: request })
  const user = await faunadb.query<User>(
    q.Get(
      q.Match(
        q.Index('user_by_email'),
        q.Casefold(session?.user?.email as string)
      )
    )
  )
  let customerId = user.data.stripe_customer_id
  if (!customerId) {
    const stripeCustomer = await stripe.customers.create({
      email: session?.user?.email as string
    })
    await faunadb.query(
      q.Update(
        q.Ref(q.Collection('users'), user.ref.id),
        {
          data: {
            stripe_customer_id: stripeCustomer.id
          }
        }
      )
    )
    customerId = stripeCustomer.id
  }
  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ["card"],
    billing_address_collection: "required",
    line_items: [
      {
        price: process.env.STRIPE_PRODUCT_PRICE_ID as string,
        quantity: 1
      },
    ],
    mode: "subscription",
    allow_promotion_codes: true,
    success_url: process.env.STRIPE_SUCCESS_URL as string,
    cancel_url: process.env.STRIPE_CANCEL_URL as string,
  })
  return response.status(200).json({
    sessionId: stripeCheckoutSession.id
  })
}
