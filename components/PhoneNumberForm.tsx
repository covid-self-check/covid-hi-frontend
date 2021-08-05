import React, { useState, useContext } from 'react'
import Card from './Card'
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
} from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'

import { makeStyles } from '@material-ui/styles'

import {
  convertRequestHelpDataToDto,
  convertUpdateFormDataToDto,
  requestHelpData,
  requestHelpDto,
  updateData,
  updateDto,
} from '../util/types'
import { requestHelpToRegister, updatePatient } from '../firebase/functions'
import ModalComponent, { ModalComponentProps } from './ModalComponent'
import { LineContext } from '../util/lineContext'
import LoadingModal from './LoadingModal'

const useStyles = makeStyles(
  {
    title: {
      fontSize: '2rem',
    },
    subtitle: {
      fontSize: '1.2rem',
    },
    title_div: {
      marginBottom: '30px',
    },
    text_field: {
      marginTop: '10px',
      marginBottom: '10px',
    },
    button: {
      marginTop: '10px',
      marginBottom: '10px',
    },
    form_label: {
      marginTop: '30px',
      marginBottom: '10px',
    },
  },
  { index: 1 },
)

export default function PhoneNumberForm() {
  const styles = useStyles()
  const { control, handleSubmit } = useForm<requestHelpData>({
    defaultValues: {
      name: '',
      personalPhoneNo: '',
    },
  })

  // state to handle modal
  const [open, setOpen] = useState(false)
  const [modalProps, setModalProps] = useState<
    Pick<ModalComponentProps, 'variant' | 'title' | 'subTitle' | 'page'>
  >({
    page: 'register',
    variant: 'success',
    title: 'ลงทะเบียนสำเร็จ',
    subTitle: 'โปรดกดปุ่มด้านล่างเพื่อกรอกอาการ',
  })
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [isLoading, setLoading] = useState(false)

  const openModal = (isSuccess: boolean, color?: string, errors?: string[]) => {
    if (isSuccess)
      setModalProps({
        page: 'requestHelp',
        variant: 'success',
        title: 'แจ้งข้อมูลติดต่อสำเร็จ',
        subTitle: 'กรุณารอการติดต่อจากทางอาสาสมัคร',
      })
    else
      setModalProps({
        page: 'requestHelp',
        variant: 'error',
        title: 'แจ้งข้อมูลติดต่อไม่สำเร็จ',
        subTitle: 'กรุณากรอกใหม่อีกครั้ง',
      })
    handleOpen()
  }

  const { lineUserID, lineIDToken } = useContext(LineContext)

  const onSubmit = async (values: requestHelpData) => {
    setLoading(true)
    console.log(values)
    const convertedData: requestHelpDto = convertRequestHelpDataToDto(values, {
      lineUserID,
      lineIDToken,
    })
    const response = await requestHelpToRegister(convertedData)
    setLoading(false)
    openModal(response?.ok as boolean)
  }

  const replaceWithNumbers = (text: string) => text.replace(/\D+/g, '')

  return (
    <>
      <Card>
        <Container className={styles.title_div} style={{ flexDirection: 'column' }}>
          <div className={styles.subtitle}>โปรดใส่เบอร์โทรศัพท์</div>
        </Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="ชื่อ (ไม่ต้องใส่คำนำหน้า) *"
                  className={styles.text_field}
                  value={value}
                  fullWidth
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: 'โปรดใส่ชื่อ' }}
            />
            <Controller
              name="personalPhoneNo"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="เบอร์โทรติดต่อ * (ไม่ต้องมีขีดหรือเว้นวรรค)"
                  className={styles.text_field}
                  value={value}
                  inputProps={{ maxLength: 10 }}
                  fullWidth
                  onChange={(e) => {
                    onChange(replaceWithNumbers(e.target.value))
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: 'โปรดใส่เบอร์โทรติดต่อ' }}
            />
            <Button
              className={styles.button}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              ยืนยัน
            </Button>
          </Container>
        </form>
      </Card>
      <LoadingModal state={isLoading} onCloseHandler={() => setLoading(false)} />
      <ModalComponent {...modalProps} state={open} onCloseHandler={handleClose} />
    </>
  )
}
