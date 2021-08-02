import React from 'react'
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
import styles from '../styles/RegistrationForm.module.css'
import { Controller, useForm } from 'react-hook-form'
import { updateData } from '../util/types'

export default function UpdateForm() {
  const { control, handleSubmit } = useForm<updateData>({
    defaultValues: {
      cough: false,
      soreThroat: false,
      headAche: false,
      hasHelper: false,
    },
  })

  const onSubmit = (values: updateData) => console.log(values)

  return (
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
                label="อณภูมิรางก่าย (องศา)"
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
  )
}
