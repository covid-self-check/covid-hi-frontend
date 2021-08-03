import { Backdrop, Box, Button, Fade, Modal, Typography } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import { useRouter } from 'next/dist/client/router'
import React, { useState } from 'react'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
}

export interface ModalComponentProps {
  variant: 'success' | 'error'
  page: 'register' | 'update'
  title: string
  subTitle?: string
  state: boolean
  onCloseHandler: () => void
}

export default function ModalComponent(props: ModalComponentProps) {
  const { variant, page, title, subTitle, state, onCloseHandler } = props

  const router = useRouter()

  const redirectToUpdate = () => router.replace('/update')

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={state}
        onClose={() => {}}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={state}>
          <Box sx={style}>
            <Box sx={{ textAlign: 'center' }}>
              {variant === 'success' ? (
                <CheckCircleIcon sx={{ fontSize: 150, color: '#4FE086' }} />
              ) : (
                <ErrorIcon sx={{ fontSize: 150, color: '#FF951A' }} />
              )}
              <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mt: 2 }}>
                {title}
              </Typography>
              {subTitle && (
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  {subTitle}
                </Typography>
              )}
              {variant === 'success' ? (
                page === 'register' ? (
                  <Button variant="outlined" sx={{ mt: 4 }} onClick={() => redirectToUpdate()}>
                    กรอกอาการ
                  </Button>
                ) : (
                  <p>โปรดปิดหน้าต่างนี้ และกลับมาแจ้งอาการในครั้งต่อๆไป</p>
                )
              ) : (
                <Button variant="outlined" sx={{ mt: 4 }} onClick={onCloseHandler}>
                  กรอกข้อมูลอีกครั้ง
                </Button>
              )}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
