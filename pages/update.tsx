import React from 'react'
import GithubButton from '../components/GithubButton'
import UpdateForm from '../components/UpdateForm'
import { useStyles } from './register'

export default function Update() {
  const styles = useStyles()
  return (
    <div className={styles.container}>
      <UpdateForm />
      <GithubButton />
    </div>
  )
}
