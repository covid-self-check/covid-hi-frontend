import { createContext } from 'react'
import { lineUserData } from './types'

export const LineContext = createContext<lineUserData>({ lineUserID: '', lineIDToken: '' })
