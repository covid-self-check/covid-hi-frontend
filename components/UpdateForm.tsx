import React, { useState, useContext, useEffect, useCallback } from 'react'
import Card from './Card'
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputAdornment,
  InputLabel,
  Select,
  TextField,
} from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'

import { makeStyles } from '@material-ui/styles'

import { convertUpdateFormDataToDto, updateData, updateDto } from '../util/types'
import { getProfile, updatePatient } from '../firebase/functions'
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

export default function UpdateForm() {
  const styles = useStyles()
  const { control, handleSubmit } = useForm<updateData>({
    defaultValues: {
      age: '',
      weight: '',
      height: '',
      gender: '',

      spO2: 0,
      spO2Eih: 0,

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
      fac_bed_ridden_status: false,
      fac_uri_symptoms: false,
      fac_olfactory_symptoms: false,
      fac_diarrhea: false,
      fac_dyspnea: false,
      fac_chest_discomfort: false,
      fac_gi_symptoms: false,

      rf_copd_chronic_lung_disease: false,
      rf_ckd_stagr_3_to_4: false,
      rf_chronic_heart_disease: false,
      rf_cva: false,
      rf_t2dm: false,
      rf_cirrhosis: false,
      rf_immunocompromise: false,
      fac_diabetes: false,
      fac_dyslipidemia: false,
      fac_hypertension: false,
      fac_heart_diseases: false,
      fac_esrd: false,
      fac_cancer: false,
      fac_tuberculosis: false,
      fac_hiv: false,
      fac_asthma: false,
      fac_pregnancy: false,
    },
  })

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

  const replaceWithNumbers = (text: string) => text.replace(/\D+/g, '')

  const [isLoading, setLoading] = useState(false)

  const openModal: (isSuccess: boolean, options: { redirect?: boolean; toAMED?: boolean }) => void =
    useCallback((isSuccess, { redirect, toAMED }) => {
      console.log(redirect)
      if (redirect)
        setModalProps({
          page: 'update',
          variant: 'redirect',
          title: 'ยังไม่ได้ลงทะเบียน',
          subTitle: 'โปรดลงทะเบียนก่อนแจ้งอาการ',
        })
      else if (toAMED) {
        setModalProps({
          page: 'update',
          variant: 'toAMED',
          title: 'ท่านอยู่ในการดูแลของแพทย์แล้ว',
          subTitle: 'โปรดรอการดำเนินการจากทางแพทย์ต่อไป',
        })
      } else if (isSuccess)
        setModalProps({
          page: 'update',
          variant: 'success',
          title: 'แจ้งอาการสำเร็จ',
          subTitle: 'โปรดรอดูผลวิเคราะห์อาการใน Line Official',
        })
      else
        setModalProps({
          page: 'update',
          variant: 'error',
          title: 'แจ้งอาการไม่สำเร็จ',
          subTitle: 'กรุณากรอกใหม่อีกครั้ง',
        })
      handleOpen()
    }, [])

  const { lineUserID, lineIDToken } = useContext(LineContext)

  const [isRegistered, setRegistered] = useState<boolean>(false)

  const checkRegistration = useCallback(async () => {
    setLoading(true)
    if (lineUserID && lineIDToken) {
      const profile = await getProfile({
        lineUserID: lineUserID,
        lineIDToken: lineIDToken,
      })
      console.log('profile:', profile)
      if (profile?.patient) {
        setRegistered(true)
        if (profile?.patient?.toAmed === 1) openModal(false, { toAMED: true })
      } else openModal(false, { redirect: true })
    }
    setLoading(false)
  }, [lineIDToken, lineUserID, openModal])

  const onSubmit = async (values: updateData) => {
    setLoading(true)
    const convertedData: updateDto = convertUpdateFormDataToDto(values, {
      lineUserID,
      lineIDToken,
    })
    console.log(values)
    const response = await updatePatient(convertedData)
    console.log(response)
    setLoading(false)
    openModal(response?.ok as boolean, {})
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
              name="age"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="อายุ *"
                  className={styles.text_field}
                  value={value}
                  fullWidth
                  inputProps={{ maxLength: 3 }}
                  onChange={(e) => {
                    onChange(replaceWithNumbers(e.target.value))
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: 'โปรดใส่อายุ' }}
            />
            <Controller
              name="weight"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="น้ำหนัก *"
                  className={styles.text_field}
                  value={value}
                  fullWidth
                  onChange={(e) => {
                    onChange(replaceWithNumbers(e.target.value))
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                  inputProps={{ maxLength: 3 }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">กก.</InputAdornment>,
                  }}
                />
              )}
              rules={{ required: 'โปรดใส่น้ำหนัก' }}
            />
            <Controller
              name="height"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="ส่วนสูง *"
                  className={styles.text_field}
                  value={value}
                  fullWidth
                  onChange={(e) => {
                    onChange(replaceWithNumbers(e.target.value))
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                  inputProps={{ maxLength: 3 }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">ซม.</InputAdornment>,
                  }}
                />
              )}
              rules={{ required: 'โปรดใส่ส่วนสูง' }}
            />
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormControl className={styles.text_field} fullWidth>
                  <InputLabel error={error ? true : false} htmlFor="outlined-age-native-simple">
                    เพศ
                  </InputLabel>
                  <Select
                    onChange={onChange}
                    value={value}
                    native
                    label="เพศ"
                    inputProps={{
                      name: 'gender',
                      id: 'outlined-age-native-simple',
                    }}
                    error={error ? true : false}
                  >
                    <option aria-label="" value="" />
                    <option value="male">ชาย</option>
                    <option value="female">หญิง</option>
                    <option value="unknown">ไม่ระบุ</option>
                  </Select>
                  <FormHelperText error={error ? true : false}>
                    {error ? error.message : ''}
                  </FormHelperText>
                </FormControl>
              )}
              rules={{ required: 'โปรดใส่เพศ' }}
            />
            <FormLabel className={styles.form_label} component="legend">
              ข้อมูลทั่วไป (ไม่ต้องกรอกหากไม่มี)
            </FormLabel>
            <Controller
              name="spO2"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="ค่าออกซิเจนปลายนิ้ว ขณะหายใจปกติ (เปอร์เซ็นต์)"
                  className={styles.text_field}
                  value={value}
                  type="number"
                  fullWidth
                  inputProps={{ min: 0, max: 100.0, step: 1 }}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: 'โปรดระบุค่าออกซิเจนปลายนิ้ว ขณะหายใจปกติ' }}
            />
            <Controller
              name="spO2Eih"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="ค่าออกซิเจนปลายนิ้ว หลังลุก-นั่ง 1 นาที (เปอร์เซ็นต์)"
                  className={styles.text_field}
                  value={value}
                  type="number"
                  fullWidth
                  inputProps={{ min: 0, max: 100.0, step: 1 }}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: 'โปรดระบุค่าออกซิเจนปลายนิ้ว หลังลุก-นั่ง 1 นาที' }}
            />
            <FormLabel className={styles.form_label} component="legend">
              อาการที่พบ (ไม่ต้องกรอกหากไม่มี)
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

            <FormControl disabled={isRegistered}>
              <FormLabel className={styles.form_label} component="legend">
                โรคประจำตัว (ไม่ต้องกรอกหากไม่มี)
              </FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Controller
                      name="fac_bed_ridden_status"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox checked={value} onChange={onChange} />
                      )}
                    />
                  }
                  label="ป่วยติดเตียง"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="fac_uri_symptoms"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox checked={value} onChange={onChange} />
                      )}
                    />
                  }
                  label="โรคเกี่ยวกับทางเดินหายใจส่วนบน"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="fac_diarrhea"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox checked={value} onChange={onChange} />
                      )}
                    />
                  }
                  label="โรคท้องเสีย"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="fac_gi_symptoms"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox checked={value} onChange={onChange} />
                      )}
                    />
                  }
                  label="มีอาการเกี่ยวกับทางเดินอาหาร"
                />

                <FormControlLabel
                  control={
                    <Controller
                      name="rf_copd_chronic_lung_disease"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox checked={value} onChange={onChange} />
                      )}
                    />
                  }
                  label="มีโรคปอดเรื้อรัง เช่น โรคถุงลมโป่งพอง"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="rf_cva"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox checked={value} onChange={onChange} />
                      )}
                    />
                  }
                  label="มีโรคหลอดเลือดสมอง"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="rf_cirrhosis"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox checked={value} onChange={onChange} />
                      )}
                    />
                  }
                  label="มีโรคตับแข็ง"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="rf_immunocompromise"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox checked={value} onChange={onChange} />
                      )}
                    />
                  }
                  label="มีภาวะภูมิคุ้มกันบกพร่อง"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="fac_diabetes"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox checked={value} onChange={onChange} />
                      )}
                    />
                  }
                  label="มีโรคเบาหวาน"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="fac_dyslipidemia"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox checked={value} onChange={onChange} />
                      )}
                    />
                  }
                  label="มีโรคไขมันในเลือดสูง"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="fac_hypertension"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox checked={value} onChange={onChange} />
                      )}
                    />
                  }
                  label="มีโรคความดันสูง"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="fac_heart_diseases"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox checked={value} onChange={onChange} />
                      )}
                    />
                  }
                  label="มีโรคหัวใจ"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="fac_esrd"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox checked={value} onChange={onChange} />
                      )}
                    />
                  }
                  label="มีโรคไตเสื่อม"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="fac_cancer"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox checked={value} onChange={onChange} />
                      )}
                    />
                  }
                  label="มีโรคมะเร็ง"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="fac_tuberculosis"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox checked={value} onChange={onChange} />
                      )}
                    />
                  }
                  label="เป็นวัณโรค"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="fac_hiv"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox checked={value} onChange={onChange} />
                      )}
                    />
                  }
                  label="ติดเชื้อ HIV"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="fac_asthma"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox checked={value} onChange={onChange} />
                      )}
                    />
                  }
                  label="มีโรคหอบหืด"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="fac_pregnancy"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox checked={value} onChange={onChange} />
                      )}
                    />
                  }
                  label="ตั้งครรภ์"
                />
              </FormGroup>
            </FormControl>
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
