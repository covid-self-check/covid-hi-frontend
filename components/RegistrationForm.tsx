import React, { useState, useEffect, useRef, useMemo, useContext, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  TextField,
  Container,
  InputLabel,
  Select,
  FormControl,
  FormLabel,
  FormControlLabel,
  InputAdornment,
  Button,
  FormHelperText,
  FormGroup,
  Checkbox,
  Autocomplete,
  MenuItem,
} from '@material-ui/core'
import Card from './Card'
// import styles from '../styles/RegistrationForm.module.css'
import { convertFormDataToAPIData, convertProfileToFormData, registerFormData } from '../util/types'
import { getAddress, getCovidTestCentres } from '../util/constants'
import { getProfile, registerPatient } from '../firebase/functions'
import { makeStyles } from '@material-ui/styles'
import { useRouter } from 'next/dist/client/router'
import { route } from 'next/dist/next-server/server/router'
import ModalComponent, { ModalComponentProps } from './ModalComponent'
import { LineContext } from '../util/lineContext'
import LoadingModal from './LoadingModal'

const NATIONAL_ID_MAX_LENGTH = 13
const PASSPORT_ID_OLD_MAX_LENGTH = 7
const PASSPORT_ID_NEW_MAX_LENGTH = 9

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

export default function RegistrationForm() {
  const styles = useStyles()
  const router = useRouter()

  const [formData, setFormData] = useState<registerFormData>({} as registerFormData)

  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      personalID: '',
      birthDate: '',
      weight: '',
      height: '',
      gender: '',
      address: '',
      addressInfo: {
        province: '',
        district: '',
        subdistrict: '',
        postalCode: '',
      },
      hasHelper: false,
      // digitalLiteracy: false,
      contactInfo: {
        phoneNumber: '',
        // closeContactsPhoneNumber: '',
        emergencyContactPhoneNumber: '',
      },
      // lineID: '',
      vaccination: 'none',
      vaccinationDates: {
        firstDoseName: '',
        firstDoseDate: '',
        secondDoseName: '',
        secondDoseDate: '',
      },
      gotFavipiravia: 'none',
      favipiraviaAmount: '',
      // stationName: '',
      latestCovidTestDate: '',
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

  const [componentDidMount, setComponentDidMount] = useState<boolean>(false)

  const [vaccination, setVaccination] = useState<string>('none')
  const [nationalIdOrPassportFieldStatus, setNationalIdOrPassportFieldStatus] = useState('unknown')
  const [nationalIdOrPassportFieldMaxLength, setNationalIdOrPassportFieldMaxLength] =
    useState(NATIONAL_ID_MAX_LENGTH)

  const [provinces, setProvinces] = useState<string[]>([])
  const [districts, setDistricts] = useState<string[]>([])
  const [subdistricts, setSubdistricts] = useState<string[]>([])
  const [postalCodes, setPostalCodes] = useState<string[]>([])
  const [covidTestCentreNames, setCovidTestCentreNames] = useState<string[]>([])

  const [province, setProvince] = useState<string>('')
  const [district, setDistrict] = useState<string>('')
  const [subdistrict, setSubdistrict] = useState<string>('')
  const [postalCode, setPostalCode] = useState<string>('')
  const [gotMedication, setMedication] = useState<string>('none')
  const [stationName, setStationName] = useState<string>('')
  const [stationIdIsAvailable, setStationIdIsAvailable] = useState<boolean>(false)

  const THAddresses = useMemo(() => getAddress(), [])
  const covidTestCentres = useMemo(() => getCovidTestCentres(), [])

  const useHasChanged = (val: any) => {
    const prevVal = usePrevious(val)
    return prevVal !== val
  }

  const usePrevious = (value: any) => {
    const ref = useRef()
    useEffect(() => {
      ref.current = value
    })
    return ref.current
  }

  const hasProvinceChanged = useHasChanged(province)
  const hasDistrictChanged = useHasChanged(district)
  const hasSubdistrictChanged = useHasChanged(subdistrict)

  useEffect(() => {
    if (!componentDidMount) {
      let tempProvinces: string[] = []
      for (let i = 0; i < THAddresses.length; i++) {
        tempProvinces.push(THAddresses[i][0] as string)
      }

      setProvinces(tempProvinces)
      setComponentDidMount(true)
    }

    if (covidTestCentreNames.length === 0) {
      const tempCovidTestCentreNames: string[] = covidTestCentres.map((centre) => centre.name)

      setCovidTestCentreNames(tempCovidTestCentreNames)
    }

    if (router.query.stationId != undefined || router.query.stationId != '') {
      covidTestCentres.forEach((centre) => {
        if (`${centre.id}` === router.query.stationId) {
          setStationName(centre.name)
          setStationIdIsAvailable(true)
          return
        }
      })
    }

    if (hasProvinceChanged) {
      let tempDistricts: string[] = []

      for (let i = 0; i < THAddresses.length; i++)
        if (THAddresses[i][0] === province)
          for (let j = 0; j < THAddresses[i][1].length; j++)
            tempDistricts.push(THAddresses[i][1][j][0] as string)

      setDistricts(tempDistricts)
      if (!isPrechecking) {
        setDistrict('')
        setSubdistrict('')
        setPostalCode('')
      }
    }

    if (hasDistrictChanged) {
      let tempSubdistricts: string[] = []

      for (let i = 0; i < THAddresses.length; i++)
        if (THAddresses[i][0] === province)
          for (let j = 0; j < THAddresses[i][1].length; j++)
            if (THAddresses[i][1][j][0] === district)
              for (let k = 0; k < THAddresses[i][1][j][1].length; k++)
                tempSubdistricts.push(THAddresses[i][1][j][1][k][0] as string)

      setSubdistricts(tempSubdistricts)
      if (!isPrechecking) {
        setSubdistrict('')
        setPostalCode('')
      }
    }

    if (hasSubdistrictChanged) {
      let tempPostalCodes: string[] = []

      for (let i = 0; i < THAddresses.length; i++)
        if (THAddresses[i][0] === province)
          for (let j = 0; j < THAddresses[i][1].length; j++)
            if (THAddresses[i][1][j][0] === district)
              for (let k = 0; k < THAddresses[i][1][j][1].length; k++)
                if (THAddresses[i][1][j][1][k][0] === subdistrict)
                  tempPostalCodes = THAddresses[i][1][j][1][k][1] as string[]

      setPostalCodes(tempPostalCodes.map((item) => `${item}`))
      if (!isPrechecking) setPostalCode('')
    }
  }, [
    componentDidMount,
    formData,
    province,
    district,
    subdistrict,
    postalCode,
    hasProvinceChanged,
    hasDistrictChanged,
    hasSubdistrictChanged,
    THAddresses,
    router,
    covidTestCentreNames,
    covidTestCentres,
  ])

  const openModal = (isSuccess: boolean, errors?: string[]) => {
    if (isSuccess)
      setModalProps({
        page: 'register',
        variant: 'success',
        title: 'ลงทะเบียนสำเร็จ',
        subTitle: 'โปรดกลับมาแจ้งอาการในภายหลัง',
      })
    else
      setModalProps({
        page: 'register',
        variant: 'error',
        title: 'ลงทะเบียนไม่สำเร็จ',
        subTitle: 'กรุณากรอกใหม่อีกครั้ง',
      })
    handleOpen()
  }

  const [isLoading, setLoading] = useState(false)

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

  const { lineUserID, lineIDToken } = useContext(LineContext)

  const [isPrechecking, setPrechecking] = useState<boolean>(false)

  const [isRegistered, setRegistered] = useState<boolean>(false)

  const checkRegistration = useCallback(async () => {
    setPrechecking(true)
    setLoading(true)
    if (lineUserID && lineIDToken) {
      const profile = await getProfile({
        lineUserID: lineUserID,
        lineIDToken: lineIDToken,
      })
      if (profile?.patient) {
        setRegistered(true)
        const patientFormData: registerFormData = convertProfileToFormData({
          ...profile.line,
          ...profile.patient,
        })
        Object.entries(patientFormData).forEach(([key, value]) => {
          setValue(key as any, value)
        })
        setProvince(patientFormData.addressInfo.province)
        setDistrict(patientFormData.addressInfo.district)
        setSubdistrict(patientFormData.addressInfo.subdistrict)
        setPostalCode(patientFormData.addressInfo.postalCode)
        setVaccination(patientFormData.vaccination)
        setMedication(patientFormData.gotFavipiravia)
      }
    }
    setPrechecking(false)
    setLoading(false)
  }, [lineIDToken, lineUserID, setValue])

  useEffect(() => {
    checkRegistration()
  }, [checkRegistration])

  const onSubmit = async (data: registerFormData) => {
    setLoading(true)
    const hasNationalId = nationalIdOrPassportFieldStatus === 'id'
    const convertedData = convertFormDataToAPIData(data, {
      lineUserID: lineUserID,
      lineIDToken: lineIDToken,
    })
    const response = await registerPatient(convertedData)
    setLoading(false)
    openModal(response?.ok as boolean)
    // openModal(true)
    setFormData(data)
  }

  const onVaccinationChange = (data: string) => setVaccination(data)

  function onNationalIdOrPassportFieldChange(data: string) {
    if (data.length === 0) {
      setNationalIdOrPassportFieldStatus('unknown')
      setNationalIdOrPassportFieldMaxLength(NATIONAL_ID_MAX_LENGTH)
      return
    }
    if (data.length === 1) {
      if (isNumeric(data[0])) {
        setNationalIdOrPassportFieldStatus('id')
        setNationalIdOrPassportFieldMaxLength(NATIONAL_ID_MAX_LENGTH)
        return
      }
      setNationalIdOrPassportFieldStatus('unknown')
      setNationalIdOrPassportFieldMaxLength(NATIONAL_ID_MAX_LENGTH)
      return
    }
    if (data.length >= 2) {
      if (!isNumeric(data[0])) {
        if (isNumeric(data[1])) {
          setNationalIdOrPassportFieldStatus('passport_old')
          setNationalIdOrPassportFieldMaxLength(PASSPORT_ID_OLD_MAX_LENGTH)
          return
        }
        setNationalIdOrPassportFieldStatus('passport_new')
        setNationalIdOrPassportFieldMaxLength(PASSPORT_ID_NEW_MAX_LENGTH)
        return
      }
    }
  }

  function handlePassportInput(passportId: string) {
    if (nationalIdOrPassportFieldStatus === 'passport_old') {
      return passportId[0].toUpperCase() + replaceWithNumbers(passportId.slice(1))
    }

    if (nationalIdOrPassportFieldStatus === 'passport_new') {
      if (passportId[1] == undefined) {
        return passportId[0].toUpperCase()
      }

      return (
        passportId[0].toUpperCase() +
        passportId[1].toUpperCase() +
        replaceWithNumbers(passportId.slice(2))
      )
    }
  }

  const replaceWithNumbers = (text: string) => text.replace(/\D+/g, '')

  const replaceWithLatinCharactersOrNumbers = (text: string) => text.replace(/[^A-Za-z0-9]/g, '')

  const isNumeric = (str: string) => /^\d+$/.test(str)

  return (
    <>
      <Card>
        <Container className={styles.title_div} style={{ flexDirection: 'column' }}>
          <div className={styles.title}>
            {!isRegistered ? 'ลงทะเบียน' : 'ท่านได้ลงทะเบียนเรียบร้อยแล้ว'}
          </div>
          <div className={styles.subtitle}>
            {!isRegistered
              ? 'กรุณากรอกข้อมูลให้ครบถ้วน'
              : 'โปรดไปที่หน้าแจ้งอาการ เพื่อแจ้งอาการในแต่ละวัน'}
          </div>
        </Container>

        <form id="registrationForm" onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <FormLabel className={styles.form_label} component="legend">
              ข้อมูลทั่วไป
            </FormLabel>
            <Controller
              name="firstName"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  disabled={isRegistered}
                  label="ชื่อ *"
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
              name="lastName"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  disabled={isRegistered}
                  label="นามสกุล *"
                  className={styles.text_field}
                  value={value}
                  fullWidth
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: 'โปรดใส่นามสกุล' }}
            />
            <Controller
              name="personalID"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  disabled={isRegistered}
                  label="หมายเลขบัตรประชาชน 13 หลัก / Passport Number *"
                  className={styles.text_field}
                  value={value}
                  fullWidth
                  inputProps={{ maxLength: nationalIdOrPassportFieldMaxLength }}
                  onChange={(e) => {
                    let input = replaceWithLatinCharactersOrNumbers(e.target.value.toUpperCase())

                    if (input === '' || input == undefined) {
                      onNationalIdOrPassportFieldChange(input)
                      onChange('')
                      return
                    }

                    onNationalIdOrPassportFieldChange(input)

                    if (nationalIdOrPassportFieldStatus === 'unknown') {
                      onChange(input)
                      return
                    }

                    if (nationalIdOrPassportFieldStatus === 'id') {
                      onChange(replaceWithNumbers(input))
                    } else if (nationalIdOrPassportFieldStatus.includes('passport')) {
                      onChange(handlePassportInput(input))
                    }
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{
                required: 'โปรดกรอกหมายเลขบัตรประชาชน 13 หลัก / Passport Number',
              }}
            />
            {/* <Controller
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
            /> */}
            <Controller
              name="birthDate"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  disabled={isRegistered}
                  fullWidth
                  className={styles.text_field}
                  id="date"
                  label="วัน/เดือน/ปีเกิด"
                  type="date"
                  defaultValue={undefined}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: 'โปรดใส่วัน/เดือน/ปีเกิด' }}
            />
            <Controller
              name="weight"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  disabled={isRegistered}
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
                  disabled={isRegistered}
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
                <FormControl className={styles.text_field} fullWidth disabled={isRegistered}>
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
              ที่อยู่ปัจจุบัน
            </FormLabel>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  disabled={isRegistered}
                  label="ที่อยู่ปัจจุบัน *"
                  className={styles.text_field}
                  value={value}
                  fullWidth
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: 'โปรดใส่ที่อยู่ปัจจุบัน' }}
            />
            <Controller
              name="addressInfo.province"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Autocomplete
                    disabled={isRegistered}
                    id="provinces_autocomplete"
                    options={[...provinces, '']}
                    onChange={(e, newValue) => {
                      onChange(newValue)
                      setProvince(newValue || '')
                    }}
                    value={province}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        className={styles.text_field}
                        label="จังหวัด *"
                        variant="outlined"
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                  />
                </>
              )}
              rules={{ required: 'โปรดใส่จังหวัด' }}
            />
            <Controller
              name="addressInfo.district"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Autocomplete
                    disabled={isRegistered}
                    id="districts_autocomplete"
                    options={[...districts, '']}
                    onChange={(e, newValue) => {
                      onChange(newValue)
                      setDistrict(newValue || '')
                    }}
                    value={district}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        className={styles.text_field}
                        label="เขต / อำเภอ *"
                        variant="outlined"
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                  />
                </>
              )}
              rules={{ required: 'โปรดใส่เขต / อำเภอ' }}
            />
            <Controller
              name="addressInfo.subdistrict"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Autocomplete
                    disabled={isRegistered}
                    id="subdistricts_autocomplete"
                    options={[...subdistricts, '']}
                    onChange={(e, newValue) => {
                      onChange(newValue)
                      setSubdistrict(newValue || '')
                    }}
                    value={subdistrict}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        className={styles.text_field}
                        label="แขวง / ตำบล *"
                        variant="outlined"
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                  />
                </>
              )}
              rules={{ required: 'โปรดใส่แขวง / ตำบล' }}
            />
            <Controller
              name="addressInfo.postalCode"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Autocomplete
                    disabled={isRegistered}
                    id="postalCodes_autocomplete"
                    options={[...postalCodes, '']}
                    onChange={(e, newValue) => {
                      onChange(newValue)
                      setPostalCode(newValue || '')
                    }}
                    value={`${postalCode}`}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        className={styles.text_field}
                        label="รหัสไปรษณีย์ *"
                        variant="outlined"
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                  />
                </>
              )}
              rules={{ required: 'โปรดใส่รหัสไปรษณียฺ' }}
            />

            <FormLabel className={styles.form_label} component="legend">
              ข้อมูลการติดต่อ
            </FormLabel>
            <Controller
              name="contactInfo.phoneNumber"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  disabled={isRegistered}
                  label="เบอร์โทรติดต่อ * (ไม่ต้องมีขีดหรือวรรค)"
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
            {/* <Controller
              name="lineID"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="ไอดีไลน์"
                  className={styles.text_field}
                  value={value}
                  fullWidth
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: 'โปรดใส่ไอดีไลน์' }}
            /> */}
            {/* <Controller
              name="contactInfo.closeContactsPhoneNumber"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="เบอร์โทรติดต่อคนใกล้ชิด (ไม่ต้องมีขีดหรือวรรค)"
                  className={styles.text_field}
                  value={value}
                  fullWidth
                  inputProps={{ maxLength: 10 }}
                  onChange={(e) => {
                    onChange(replaceWithNumbers(e.target.value))
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: 'โปรดใส่เบอร์โทรติดต่อคนใกล้ชิด' }}
            /> */}
            <Controller
              name="contactInfo.emergencyContactPhoneNumber"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  disabled={isRegistered}
                  label="เบอร์โทรติดต่อฉุกเฉิน * (ไม่ต้องมีขีดหรือวรรค)"
                  className={styles.text_field}
                  value={value}
                  fullWidth
                  inputProps={{ maxLength: 10 }}
                  onChange={(e) => {
                    onChange(replaceWithNumbers(e.target.value))
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: 'โปรดใส่เบอร์โทรติดต่อฉุกเฉิน' }}
            />
            <FormLabel className={styles.form_label} component="legend">
              มีผู้ดูแลระหว่างรักษาอยู่ที่บ้านหรือไม่
            </FormLabel>
            <Controller
              name="hasHelper"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControl className={styles.text_field} fullWidth disabled={isRegistered}>
                  <InputLabel htmlFor="outlined-age-native-simple">มีคนดูแลหรือไม่</InputLabel>
                  <Select
                    onChange={onChange}
                    value={value}
                    native
                    label="มีคนดูแลหรือไม่"
                    inputProps={{
                      name: 'hasHelper',
                    }}
                  >
                    <option value={'true'}>มีคนดูแล</option>
                    <option value={'false'}>ไม่มีคนดูแล</option>
                  </Select>
                </FormControl>
              )}
            />
            {/* <Controller
              name="digitalLiteracy"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControl className={styles.text_field} fullWidth>
                  <InputLabel htmlFor="outlined-age-native-simple">มีคนช่วยกรอกหรือไม่</InputLabel>
                  <Select
                    onChange={onChange}
                    value={value}
                    native
                    label="มีคนช่วยกรอกหรือไม่"
                    inputProps={{
                      name: 'digitalLiteracy',
                    }}
                  >
                    <option value={'true'}>มีคนช่วยกรอก</option>
                    <option value={'false'}>ไม่มีคนช่วยกรอก</option>
                  </Select>
                </FormControl>
              )}
            /> */}

            <FormLabel className={styles.form_label} component="legend">
              ข้อมูลการฉีดวัคซีน การรับยา และวันที่ตรวจโควิด
            </FormLabel>
            <Controller
              name="vaccination"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormControl className={styles.text_field} fullWidth disabled={isRegistered}>
                  <InputLabel error={error ? true : false} htmlFor="outlined-age-native-simple">
                    สถานะการฉีดวัคซีน
                  </InputLabel>
                  <Select
                    onChange={(e) => {
                      onChange(e.target.value)
                      onVaccinationChange(e.target.value)
                    }}
                    value={value}
                    native
                    label="สถานะการฉีดวัคซีน"
                    inputProps={{
                      name: 'vaccination',
                      id: 'outlined-age-native-simple',
                    }}
                    error={error ? true : false}
                  >
                    <option aria-label="" value="" />
                    <option value="none">ยังไม่ได้ฉีด</option>
                    <option value="one_dose">ฉีดแล้ว 1 เข็ม</option>
                    <option value="two_doses">ฉีดแล้ว 2 เข็ม</option>
                  </Select>
                  <FormHelperText error={error ? true : false}>
                    {error ? error.message : ''}
                  </FormHelperText>
                </FormControl>
              )}
              rules={{ required: 'โปรดใส่สถานะการฉีดวัคซีน' }}
            />
            {(vaccination === 'one_dose' || vaccination === 'two_doses') && (
              <>
                <Controller
                  name="vaccinationDates.firstDoseName"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <FormControl className={styles.text_field} fullWidth disabled={isRegistered}>
                      <InputLabel error={error ? true : false} htmlFor="outlined-age-native-simple">
                        ชื่อวัคซีนที่ฉีดเข็มโดสแรก
                      </InputLabel>
                      <Select
                        onChange={onChange}
                        value={value}
                        native
                        label="ชื่อวัคซีนที่ฉีดเข็มโดสแรก"
                        inputProps={{
                          name: 'vaccinationDates.firstDoseName',
                          id: 'outlined-age-native-simple',
                        }}
                        error={error ? true : false}
                      >
                        <option aria-label="" value="" />
                        <option value="sinovac">Sinovac</option>
                        <option value="az">Astrazeneca</option>
                        <option value="sinopharm">Sinopharm</option>
                        <option value="pfizer">Pfizer-BioNTech</option>
                        <option value="moderna">Moderna</option>
                      </Select>
                      <FormHelperText error={error ? true : false}>
                        {error ? error.message : ''}
                      </FormHelperText>
                    </FormControl>
                  )}
                  rules={{ required: 'โปรดใส่ชื่อวัคซีนโดสแรก' }}
                />
                <Controller
                  name="vaccinationDates.firstDoseDate"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                      <TextField
                        disabled={isRegistered}
                        fullWidth
                        className={styles.text_field}
                        id="date"
                        label="วันที่ฉีดวัคซีนโดสแรก"
                        type="date"
                        defaultValue={undefined}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    </>
                  )}
                  rules={{ required: 'โปรดใส่วันที่ฉีดวัคซีนโดสแรก' }}
                />
              </>
            )}
            {vaccination === 'two_doses' && (
              <>
                <Controller
                  name="vaccinationDates.secondDoseName"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <FormControl className={styles.text_field} fullWidth disabled={isRegistered}>
                      <InputLabel error={error ? true : false} htmlFor="outlined-age-native-simple">
                        ชื่อวัคซีนที่ฉีดเข็มโดสที่สอง
                      </InputLabel>
                      <Select
                        onChange={onChange}
                        value={value}
                        native
                        label="ชื่อวัคซีนที่ฉีดเข็มโดสที่สอง"
                        inputProps={{
                          name: 'vaccinationDates.secondDoseName',
                          id: 'outlined-age-native-simple',
                        }}
                        error={error ? true : false}
                      >
                        <option aria-label="" value="" />
                        <option value="sinovac">Sinovac</option>
                        <option value="az">Astrazeneca</option>
                        <option value="sinopharm">Sinopharm</option>
                        <option value="pfizer">Pfizer-BioNTech</option>
                        <option value="moderna">Moderna</option>
                      </Select>
                      <FormHelperText error={error ? true : false}>
                        {error ? error.message : ''}
                      </FormHelperText>
                    </FormControl>
                  )}
                  rules={{ required: 'โปรดใส่ชื่อวัคซีนโดสที่สอง' }}
                />
                <Controller
                  name="vaccinationDates.secondDoseDate"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                      <TextField
                        disabled={isRegistered}
                        fullWidth
                        className={styles.text_field}
                        id="date"
                        label="วันที่ฉีดวัคซีนโดสที่สอง"
                        type="date"
                        defaultValue={undefined}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    </>
                  )}
                  rules={{ required: 'โปรดใส่วันที่ฉีดวัคซีนโดสที่สอง' }}
                />
              </>
            )}
            <Controller
              name="gotFavipiravia"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormControl className={styles.text_field} fullWidth disabled={isRegistered}>
                  <InputLabel error={error ? true : false} htmlFor="outlined-age-native-simple">
                    สถานะการรับยา Favipiravir
                  </InputLabel>
                  <Select
                    onChange={(e) => {
                      onChange(e.target.value)
                      setMedication(e.target.value as string)
                    }}
                    value={value}
                    native
                    label="สถานะการรับยา Favipiravir (ยาต้านไวรัส)"
                    inputProps={{
                      name: 'vaccination',
                      id: 'outlined-age-native-simple',
                    }}
                    error={error ? true : false}
                  >
                    <option aria-label="" value="" />
                    <option value="none">ยังไม่ได้รับยา</option>
                    <option value="received">รับยาแล้ว</option>
                  </Select>
                  <FormHelperText error={error ? true : false}>
                    {error ? error.message : ''}
                  </FormHelperText>
                </FormControl>
              )}
              rules={{ required: 'โปรดใส่สถานะการรับยา Favipiravir' }}
            />
            {gotMedication === 'received' && (
              <Controller
                name="favipiraviaAmount"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    disabled={isRegistered}
                    label="ปริมาณยา Favipiravir ที่ได้รับ (เม็ด)"
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
                rules={{ required: 'โปรดใส่ปริมาณยา Favipiravir ที่ได้รับ' }}
              />
            )}
            {/* <Controller
              name="stationName"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Autocomplete
                    id="stationName"
                    options={covidTestCentreNames}
                    onChange={(e, newValue) => {
                      onChange(newValue)
                      setStationName(newValue || '')
                    }}
                    disabled={stationIdIsAvailable}
                    value={stationName}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        className={styles.text_field}
                        label="จุดตรวจ"
                        variant="outlined"
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                  />
                </>
              )}
              rules={{ required: 'โปรดใส่จุดตรวจ' }}
            /> */}
            {/*         <Controller
              name="latestCovidTestDate"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <TextField
                    fullWidth
                    className={styles.text_field}
                    id="date"
                    label="วันที่ตรวจโควิดครั้งล่าสุด"
                    type="date"
                    defaultValue={undefined}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                </>
              )}
              rules={{ required: 'โปรดใส่วันที่ตรวจโควิดครั้งล่าสุด' }}
            /> */}
            <FormControl disabled={isRegistered}>
              <FormLabel className={styles.form_label} component="legend">
                โรคประจำตัว (ไม่ต้องกรอกหากไม่มี)
              </FormLabel>
              <FormGroup>
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
                {/* <FormControlLabel
                control={
                  <Controller
                    name="rf_ckd_stagr_3_to_4"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox checked={value} onChange={onChange} />
                    )}
                  />
                }
                label="โรคไตเรื้อรัง ตั้งแต่ระดับสามขึ้นไป"
              /> */}
                {/* <FormControlLabel
                control={
                  <Controller
                    name="rf_chronic_heart_disease"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox checked={value} onChange={onChange} />
                    )}
                  />
                }
                label="มีโรคหัวใจ"
              /> */}
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
                {/* <FormControlLabel
                control={
                  <Controller
                    name="rf_t2dm"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox checked={value} onChange={onChange} />
                    )}
                  />
                }
                label="มีโรคเบาหวาน"
              /> */}
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
            {!isRegistered && (
              <Button
                className={styles.button}
                form="registrationForm"
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                ยืนยัน
              </Button>
            )}
          </Container>
        </form>
      </Card>
      <LoadingModal state={isLoading} onCloseHandler={() => setLoading(false)} />
      <ModalComponent {...modalProps} state={open} onCloseHandler={handleClose} />
    </>
  )
}
