import { Container } from '@material-ui/core'
import styles from '../styles/Card.module.css'

export default function Card({ children }) {
  return (
    <>
      <Container style={{ flexDirection: 'column' }} className={styles.card_div}>
        {children}
      </Container>
    </>
  )
}
