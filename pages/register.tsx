import RegistrationForm from '../components/RegistrationForm'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import GithubButton from '../components/GithubButton'

export const useStyles = makeStyles(
  {
    container: {
      minHeight: '100vh',
      padding: '0 0.5rem 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: 'auto',
      paddingBottom: '30px',
      background: 'url("/covid-hi-bg.svg")',
      backgroundSize: 'cover',
      backgroundPositionY: 'bottom',
      backgroundRepeat: 'no-repeat',
    },
  },
  { index: 1 },
)

export default function Register() {
  const styles = useStyles()
  return (
    <div className={styles.container}>
      <RegistrationForm />
      <GithubButton />
    </div>
  )
}
