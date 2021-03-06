import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import theme from '../styles/theme'
import { Navbar } from '../components/navbar'
import getConfig from 'next/config'
import { lineUserData } from '../util/types'
import { LineContext } from '../util/lineContext'
import { useRouter } from 'next/router'

const { publicRuntimeConfig } = getConfig()
const liffId = publicRuntimeConfig?.liffID
const liffUrl = publicRuntimeConfig?.liffUrl

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()
  const [lineData, setLineData] = useState<lineUserData>({ lineIDToken: '', lineUserID: '' })

  const getLiffData = useCallback(async () => {
    const liff = (await import('@line/liff')).default
    await liff.ready
    console.log('liff is ready')
    const token = await liff.getIDToken()
    const { userId } = await liff.getProfile()
    console.log('token', token)
    console.log('id', userId)
    if (token && userId) setLineData({ lineIDToken: token, lineUserID: userId })
  }, [])

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles)
    }

    async function connectWithLiff() {
      if (!liffId) {
        throw Error('Please add DEVELOPMENT_LIFF_ENV into .env.local')
      }
      const liff = (await import('@line/liff')).default
      try {
        await liff.init({ liffId })
        if (!liff.isInClient() && !liff.isLoggedIn())
          liff.login({ redirectUri: `${liffUrl}/${pathname}` })
        // liff.login({ redirectUri: 'https://localhost:3000' })
      } catch (error) {
        console.error('liff init error', error.message)
      }
      if (!liff.isLoggedIn()) {
        liff.login({ redirectUri: `${liffUrl}/${pathname}` })
        // liff.login({ redirectUri: 'https://localhost:3000' })
      }
      await getLiffData()
    }
    connectWithLiff()
  }, [getLiffData, pathname])

  return (
    <LineContext.Provider value={lineData}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>??????????????????????????????????????????</title>
          <meta name="description" content="Covid Self Check Web App" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <CssBaseline />
        {pathname !== '/requestHelp' && <Navbar />}
        <Component {...pageProps} />
      </ThemeProvider>
    </LineContext.Provider>
  )
}
export default MyApp
