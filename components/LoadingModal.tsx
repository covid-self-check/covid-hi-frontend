import { Backdrop, CircularProgress, Fade, Modal, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

interface LoadingModalProps {
  state: boolean
  onCloseHandler: () => void
}

const useStyles = makeStyles(() => ({
  centerModal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
  },
}))

const LoadingModal = (props: LoadingModalProps) => {
  const { state, onCloseHandler } = props
  const styles = useStyles()

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
          <Box className={styles.centerModal}>
            <CircularProgress size="40vw" />
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default LoadingModal
