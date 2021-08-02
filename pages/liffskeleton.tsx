import { useEffect, useState } from 'react'

export default function LiffSkeleton() {
  const [liffToken, setLiffToken] = useState('')
  const [lineID, setLineID] = useState('')

  useEffect(() => {
    async function getLiffIDToken() {
      const liff = (await import('@line/liff')).default
      await liff.ready
      console.log('ready')
      const token = await liff.getIDToken()
      const { userId } = await liff.getProfile()
      console.log('token', token)
      console.log('id', userId)
      if (token) {
        setLiffToken(token)
      }
      if (userId) {
        setLineID(userId)
      }
    }
    getLiffIDToken()
  }, [])

  return (
    <div>
      <div>token: {liffToken}</div>
      <div>lineID: {lineID}</div>
    </div>
  )
}
