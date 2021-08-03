import React from 'react'
import { Icon, SvgIcon, Toolbar, Typography } from '@material-ui/core'
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
  return (
    <Toolbar sx={{ px: 3, py: 5 }}>
      <img src="./logo.svg" width="20%" alt="logo" />
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
