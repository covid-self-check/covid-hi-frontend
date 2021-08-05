import { makeStyles } from '@material-ui/styles'
import PhoneNumberForm from '../components/PhoneNumberForm'

const useStyles = makeStyles(
  {
    container: {
      marginTop: '16px',
      marginBottom: '20px',
      minHeight: '100vh',
      padding: '0 0.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: 'auto',
      paddingBottom: '30px',
    },
  },
  { index: 1 },
)

export default function RequestHelp() {
  const styles = useStyles()
  return (
    <div className={styles.container}>
      <PhoneNumberForm />
    </div>
  )
}
