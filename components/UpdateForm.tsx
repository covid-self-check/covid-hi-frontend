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

import { convertUpdateFormDataToDto, updateData, updateDto } from '../util/types'
import { updatePatient } from '../firebase/functions'
import ModalComponent, { ModalComponentProps } from './ModalComponent'

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

export default function UpdateForm() {
  const styles = useStyles()
  const { control, handleSubmit } = useForm<updateData>({
    defaultValues: {
      bodyTemperature: 0,
      pulse: 0,
      spO2: 0,
      sym1_severe_cough: false,
      sym1_chest_tightness: false,
      sym1_poor_appetite: false,
      sym1_fatigue: false,
      sym1_persistent_fever: false,
      sym2_tired_body_ache: false,
      sym2_cough: false,
      sym2_fever: false,
      sym2_liquid_stool: false,
      sym2_cannot_smell: false,
      sym2_rash: false,
      sym2_red_eye: false,
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

  const openModal = (isSuccess: boolean, color?: string, errors?: string[]) => {
    if (isSuccess)
      setModalProps({
        page: 'update',
        variant: 'success',
        title: 'แจ้งอาการสำเร็จ',
        subTitle: `อาการของคุณอยู่ในเกณฑ์ ${color}`,
      })
    else
      setModalProps({
        page: 'update',
        variant: 'error',
        title: 'แจ้งอาการไม่สำเร็จ',
        subTitle: 'ปัญหานี้เกิดจาก',
      })
    handleOpen()
  }

  const onSubmit = async (values: updateData) => {
    const convertedData: updateDto = convertUpdateFormDataToDto(values, {
      lineUserID: 'asd4as1d4sadaefe',
      lineIDToken: 'abddc4932eddfdfd456ece',
    })
    console.log(values)
    const response = await updatePatient(convertedData)
    console.log(response)
    openModal(response?.result?.ok as boolean, 'some color')
    // openModal(true, 'some color')
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
                  inputProps={{ min: 0, max: 50 }}
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
                  inputProps={{ min: 0 }}
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
                  inputProps={{ min: 0, max: 100 }}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: 'โปรดระบุค่าออกซิเจน' }}
            />
            <FormLabel className={styles.form_label} component="legend">
              อาการที่พบ
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Controller
                    name="sym2_cough"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox checked={value} onChange={onChange} />
                    )}
                  />
                }
                label="ไอเล็กน้อย"
              />
              <FormControlLabel
                control={
                  <Controller
                    name="sym1_severe_cough"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox checked={value} onChange={onChange} />
                    )}
                  />
                }
                label="ไอรุนแรงหรือต่อเนื่อง"
              />
              <FormControlLabel
                control={
                  <Controller
                    name="sym2_tired_body_ache"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox checked={value} onChange={onChange} />
                    )}
                  />
                }
                label="อ่อนเพลีย / ปวดเมื่อยตามตัว"
              />
              <FormControlLabel
                control={
                  <Controller
                    name="sym1_fatigue"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox checked={value} onChange={onChange} />
                    )}
                  />
                }
                label="อ่อนเพลียมาก"
              />
              <FormControlLabel
                control={
                  <Controller
                    name="sym2_fever"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox checked={value} onChange={onChange} />
                    )}
                  />
                }
                label="มีไข้"
              />
              <FormControlLabel
                control={
                  <Controller
                    name="sym1_persistent_fever"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox checked={value} onChange={onChange} />
                    )}
                  />
                }
                label="มีไข้ต่อเนื่องทุกวันตั้งแต่เริ่มสังเกตอาการ (5–6 วันขึ้นไป)"
              />
              <FormControlLabel
                control={
                  <Controller
                    name="sym2_liquid_stool"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox checked={value} onChange={onChange} />
                    )}
                  />
                }
                label="ถ่ายเหลว"
              />
              <FormControlLabel
                control={
                  <Controller
                    name="sym2_cannot_smell"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox checked={value} onChange={onChange} />
                    )}
                  />
                }
                label="ไม่ได้กลิ่น"
              />
              <FormControlLabel
                control={
                  <Controller
                    name="sym2_rash"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox checked={value} onChange={onChange} />
                    )}
                  />
                }
                label="มีผื่น"
              />
              <FormControlLabel
                control={
                  <Controller
                    name="sym2_red_eye"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox checked={value} onChange={onChange} />
                    )}
                  />
                }
                label="ตาแดง"
              />
              <FormControlLabel
                control={
                  <Controller
                    name="sym1_chest_tightness"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox checked={value} onChange={onChange} />
                    )}
                  />
                }
                label="แน่นหน้าอก หายใจติดขัด จุก หรือหายใจสะดุด"
              />
              <FormControlLabel
                control={
                  <Controller
                    name="sym1_poor_appetite"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox checked={value} onChange={onChange} />
                    )}
                  />
                }
                label="เบื่ออาหาร หรือรับประทานอาหารไม่ได้"
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
