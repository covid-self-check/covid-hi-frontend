import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

interface AuxProps {
  children: React.ReactChild | React.ReactChildren | React.ReactChild[] | React.ReactChildren[]
}

const useStyles = makeStyles(
  {
    card_div: {
      background: '#ffffff',
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.15)',
      borderRadius: '8px',
      width: '80%',
      padding: '20px',
      flexDirection: 'column',
    },
  },
  { index: 1 },
)

export default function Card({ children }: AuxProps) {
  const styles = useStyles()
  return (
    <>
      <Container style={{ flexDirection: 'column' }} className={styles.card_div}>
        {children}
      </Container>
    </>
  )
}
