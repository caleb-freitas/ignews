import { GetStaticProps } from 'next'
import styles from './home.module.scss'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'

type Product = {
  priceId: string
  amount: string
}

type HomeProps = {
  product: Product
}

export default function Home(props: HomeProps) {
  const { priceId, amount } = props.product
  return (
    <>
      <Head>
        <title>home</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <h1>news about the <span>react</span> world</h1>
          <p>
            get access to all publications<br />
            <span>for only {amount} per month</span>
          </p>
          <SubscribeButton priceId={priceId} />
        </section>
        <img src="/images/avatar.svg" alt="girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve(process.env.STRIPE_PRODUCT_PRICE_ID as string, {
    expand: ['product']
  })

  const { unit_amount } = price

  const amount = unit_amount ? unit_amount / 100 : 0

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

  }).format(amount)

  const product: Product = {
    priceId: price.id,
    amount: formattedAmount,
  }

  const ONE_DAY = 60 * 60 * 24

  return {
    props: {
      product
    },
    revalidate: ONE_DAY
  }
}
