import React from 'react'
import { Toolbar, Typography } from '@material-ui/core'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import { makeStyles } from '@material-ui/styles'
import theme from '../styles/theme'

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    padding: theme.spacing(0.2, 1),
    margin: theme.spacing(0, 0.5),
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 10,
  },
  active: {
    textDecoration: 'none',
    padding: theme.spacing(0.2, 1),
    margin: theme.spacing(0, 0.5),
    color: theme.palette.primary.main,
  },
})

export const Navbar = () => {
  const router = useRouter()
  const classes = useStyles()
  return (
    <Toolbar sx={{ py: 4 }}>
      <Typography
        variant="h5"
        component="div"
        sx={{
          flexGrow: 1,
          fontWeight: 700,
          color: theme.palette.primary.main,
        }}
      >
        ComCovid
      </Typography>
      <Link href="/register" passHref>
        <Typography
          variant="body2"
          component="a"
          className={router.pathname == '/register' ? classes.active : classes.link}
        >
          ลงทะเบียน
        </Typography>
      </Link>
      <Link href="/update" passHref>
        <Typography
          variant="body2"
          component="a"
          className={router.pathname == '/update' ? classes.active : classes.link}
        >
          แจ้งอาการ
        </Typography>
      </Link>
    </Toolbar>
  )
}
