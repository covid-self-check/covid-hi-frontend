import { makeStyles } from '@material-ui/styles'
import { FC } from 'react'
import Image from 'next/image'

export const useStyles = makeStyles(
  {
    githubButton: {
      width: '259px',
      height: '52px',
      marginTop: '24px',
      padding: '0 22px',
      background: 'white',
      borderRadius: '45px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontWeight: 500,
      fontSize: '18px',
    },
  },
  { index: 1 },
)

const GithubButton: FC = () => {
  const styles = useStyles()
  return (
    <a href="https://github.com/covid-self-check" className={styles.githubButton}>
      <Image src="/github.svg" alt="Contribute at our Repository" width={36} height={36} />
      <div>Contribute at Github</div>
    </a>
  )
}

export default GithubButton
