import styles from './styles.module.scss'

type SubscribeButtonProps = {
  priceId: string
}

export function SubscribeButton(props: SubscribeButtonProps) {
  const { priceId } = props
  return (
    <button
      type="button"
      className={styles.subscribeButton}
    >
      subscribe now!
    </button>
  )
}
