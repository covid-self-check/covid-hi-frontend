import getConfig from 'next/config'
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app'
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics'

// Add the Firebase products that you want to use
import 'firebase/functions'
import { registerData } from '../util/types'

const { publicRuntimeConfig } = getConfig()

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: publicRuntimeConfig.apiKey,
    authDomain: `${publicRuntimeConfig.projectId}.firebaseapp.com`,
    projectId: publicRuntimeConfig.projectId,
    databaseURL: `https://${publicRuntimeConfig.projectId}.firebaseio.com`,
  })
}

export const registerPatient = async (data: registerData) => {
  let registerParticipant = firebase.functions().httpsCallable('registerParticipant')
  try {
    const response: firebase.functions.HttpsCallableResult = await registerParticipant(data)
    return response.data
  } catch (error) {
    console.log('Error: ', error)
  }
}
