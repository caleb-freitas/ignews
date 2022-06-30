import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ignews" />
        <nav>
          <a
            href="#"
            className={styles.active}
          >
            home
          </a>
          <a href="#">posts</a>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}
