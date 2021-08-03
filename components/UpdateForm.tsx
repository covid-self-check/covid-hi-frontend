import React, { useState } from 'react'
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

import { updateData, updateDataApi } from '../util/types'
import ModalComponent, { ModalComponentProps } from './ModalComponent'

const useStyles = makeStyles(
  {
    title: {
      fontSize: '3rem',
    },
    subtitle: {
      fontSize: '1.5rem',
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

export default function UpdateForm() {
  // state to handle modal
  const [open, setOpen] = useState(false)
  const [modalProps, setModalProps] = useState<
    Pick<ModalComponentProps, 'variant' | 'title' | 'subTitle'>
  >({
    variant: 'success',
    title: '',
    subTitle: undefined,
  })
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const styles = useStyles()
  const { control, handleSubmit } = useForm<updateData>({
    defaultValues: {
      cough: false,
      soreThroat: false,
      headAche: false,
      hasHelper: false,
    },
  })

  const onSubmit = (values: updateData) => {
    //TODO: extract id from line
    const data: updateDataApi = { ...values, lineId: 'hello', personalID: 'world' }
    console.log(data)
  }

  return (
    <>
      <Card>
        <Container className={styles.title_div} style={{ flexDirection: 'column' }}>
          <div className={styles.title}>แจ้งอาการ</div>
          <div className={styles.subtitle}>กรุณากรอกข้อมูลให้ครบถ้วน</div>
        </Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <FormLabel className={styles.form_label} component="legend">
              ข้อมูลทั่วไป
            </FormLabel>
            <Controller
              name="bodyTemperature"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="อุณภูมิรางก่าย (องศา)"
                  className={styles.text_field}
                  value={value}
                  type="number"
                  fullWidth
                  inputProps={{ max: 50 }}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: 'โปรดระบุอณหภูมิร่างกาย' }}
            />
            <Controller
              name="pulse"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="ค่าชีพจร"
                  className={styles.text_field}
                  value={value}
                  type="number"
                  fullWidth
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: 'โปรดระบุค่าชีพจร' }}
            />
            <Controller
              name="spO2"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="ระดับออกซิเจนในเลือด"
                  className={styles.text_field}
                  value={value}
                  type="number"
                  fullWidth
                  inputProps={{ max: 100 }}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: 'โปรดระบุค่าออกซิเจน' }}
            />
            <FormLabel className={styles.form_label} component="legend">
              อาการโควิด
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Controller
                    name="cough"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox checked={value} onChange={onChange} />
                    )}
                  />
                }
                label="ไอ"
              />
              <FormControlLabel
                control={
                  <Controller
                    name="soreThroat"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox checked={value} onChange={onChange} />
                    )}
                  />
                }
                label="เจ็บคอ"
              />
              <FormControlLabel
                control={
                  <Controller
                    name="headAche"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox checked={value} onChange={onChange} />
                    )}
                  />
                }
                label="ปวดหัว"
              />
            </FormGroup>
            <FormLabel className={styles.form_label} component="legend">
              สถานะ
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Controller
                    name="hasHelper"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox checked={value} onChange={onChange} />
                    )}
                  />
                }
                label="มีคนดูแลช่วยเหลือหรือไม่"
              />
            </FormGroup>
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
      <ModalComponent {...modalProps} state={open} onCloseHandler={handleClose} />
    </>
  )
}
