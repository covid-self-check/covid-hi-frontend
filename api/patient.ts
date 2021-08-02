import axios from 'axios'

import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const instance = axios.create({
  baseURL: `${publicRuntimeConfig.hostUrl}/api/`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
  },
})

export async function getPatients(page: number, limit: number) {
  return await instance.get(`patients?page=${page}&limit=${limit}`)
}
