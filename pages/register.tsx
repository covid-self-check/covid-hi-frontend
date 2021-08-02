import RegistrationForm from '../components/RegistrationForm'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(
  {
    container: {
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

export default function Register() {
  const styles = useStyles()
  return (
    <div className={styles.container}>
      <RegistrationForm />
    </div>
  )
}
