import { signIn, useSession } from 'next-auth/react'
import styles from './styles.module.scss'

export type SubscribeButtonProps = {
  priceId: string
}

export function SubscribeButton(props: SubscribeButtonProps) {
  const { data: session } = useSession()
  function handleSubscribe() {
    if (!session) {
      signIn('github')
      return
    }

  }
  const { priceId } = props
  return (
    <button
      type="button"
      onClick={handleSubscribe}
      className={styles.subscribeButton}
    >
      subscribe now!
    </button>
  )
}
