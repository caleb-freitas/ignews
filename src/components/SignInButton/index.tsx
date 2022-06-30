import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import styles from './styles.module.scss'

export function SignInButton() {
  const isUserLOggedIn = true
  return isUserLOggedIn ? (
    <button
      type="button"
      className={styles.signInButton}
    >
      <FaGithub color="#04b361" />
      Caleb Freitas
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.signInButton}
    >
      <FaGithub color="#eba417" />
      Sign In with GitHub
    </button >
  )
}
