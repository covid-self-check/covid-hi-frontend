import React from 'react'

import styles from '../styles/Home.module.css'

import RegistrationForm from '../components/RegistrationForm'

export default function Register() {
  return (
    <div className={styles.container}>
      <RegistrationForm />
    </div>
  )
}
