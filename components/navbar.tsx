import React from 'react'
import { Icon, SvgIcon, Toolbar, Typography } from '@material-ui/core'
import Link from 'next/link'
import logo from '../public/logo.svg'
import { useRouter } from 'next/dist/client/router'
import { makeStyles } from '@material-ui/styles'
import theme from '../styles/theme'
import Image from 'next/image'

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
  return (
    <Toolbar sx={{ px: 3, py: 5 }}>
      <Image src={logo} alt="Covid Self Check" width="60px" height="60px" />
      <Typography
        variant="h4"
        component="h4"
        sx={{
          flexGrow: 1,
          fontSize: '1.7rem',
          fontWeight: 700,
          color: theme.palette.primary.main,
        }}
      >
        CovidSelfCheck
      </Typography>
    </Toolbar>
  )
}
