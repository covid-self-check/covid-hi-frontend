import { Backdrop, Box, Button, Fade, Modal, Typography } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
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
  title: string
  subTitle?: string
  state: boolean
  onCloseHandler: () => void
}

export default function ModalComponent(props: ModalComponentProps) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.state}
        onClose={props.onCloseHandler}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.state}>
          <Box sx={style}>
            <Box sx={{ textAlign: 'center' }}>
              {props.variant === 'success' ? (
                <CheckCircleIcon sx={{ fontSize: 150, color: '#4FE086' }} />
              ) : (
                <ErrorIcon sx={{ fontSize: 150, color: '#FF951A' }} />
              )}
              <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mt: 2 }}>
                {props.title}
              </Typography>
              {props.subTitle && (
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  {props.subTitle}
                </Typography>
              )}
              <Button variant="outlined" sx={{ mt: 4 }} onClick={props.onCloseHandler}>
                ปิด
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
