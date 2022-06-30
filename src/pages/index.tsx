import styles from './home.module.scss'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>home</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>hello, there. welcome!</span>
          <h1>news about the <span>react</span> world</h1>
          <p>
            get access to all the publication <br />
            <span>for only $9.90 a month</span>
          </p>
        </section>
        <img src="/images/avatar.svg" alt="girl coding" />
      </main>
    </>
  )
}
