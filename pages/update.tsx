import UpdateForm from '../components/UpdateForm'
import { useStyles } from './register'

export default function Update() {
  const styles = useStyles()
  return (
    <div className={styles.container}>
      <UpdateForm />
    </div>
  )
}
