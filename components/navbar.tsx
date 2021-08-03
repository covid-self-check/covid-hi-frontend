import React from 'react'
import { Toolbar, Typography } from '@material-ui/core'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import { makeStyles } from '@material-ui/styles'
import theme from '../styles/theme'

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    padding: theme.spacing(0.7, 1.5),
    margin: theme.spacing(0, 0.5),
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 20,
  },
  active: {
    textDecoration: 'none',
    padding: theme.spacing(0.7, 1.5),
    margin: theme.spacing(0, 0.5),
    color: theme.palette.primary.main,
    borderRadius: 20,
  },
})

export const Navbar = () => {
  const router = useRouter()
  const classes = useStyles()
  return (
    <Toolbar sx={{ px: 3, py: 6 }}>
      <Typography
        variant="h5"
        component="div"
        sx={{
          flexGrow: 1,
          fontWeight: 700,
          fontSize: '1.5rem',
          color: theme.palette.primary.main,
        }}
      >
        ComCovid
      </Typography>
    </Toolbar>
  )
}
