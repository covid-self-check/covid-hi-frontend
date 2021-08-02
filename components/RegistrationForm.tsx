import React, { useState, useEffect, useRef, useMemo } from 'react'
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
} from '@material-ui/core'
import Card from './Card'
// import styles from '../styles/RegistrationForm.module.css'
import { convertFormDataToAPIData, registerData, registerFormData } from '../util/types'
import { getAddress } from '../util/address'
import { registerPatient } from '../firebase/functions'
import { makeStyles } from '@material-ui/styles'

const NATIONAL_ID_MAX_LENGTH = 13
const PASSPORT_ID_OLD_MAX_LENGTH = 7
const PASSPORT_ID_NEW_MAX_LENGTH = 9

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

export default function RegistrationForm() {
  const styles = useStyles()

  const { handleSubmit, control, getValues } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      personalID: '',
      age: '',
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
      congenitalDisease: '',
      hasHelper: false,
      digitalLiteracy: false,
      contactInfo: {
        phoneNumber: '',
        closeContactsPhoneNumber: '',
      },
      lineID: '',
      vaccination: 'none',
      vaccinationDates: {
        firstDoseName: '',
        firstDoseDate: '',
        secondDoseName: '',
        secondDoseDate: '',
      },
      gotFavipiravia: 'none',
      favipiraviaAmount: '',
    },
  })

  const [componentDidMount, setComponentDidMount] = useState(false)
  const [vaccination, setVaccination] = useState<string>('none')
  const [nationalIdOrPassportFieldStatus, setNationalIdOrPassportFieldStatus] = useState('unknown')
  const [nationalIdOrPassportFieldMaxLength, setNationalIdOrPassportFieldMaxLength] =
    useState(NATIONAL_ID_MAX_LENGTH)
  const [formData, setFormData] = useState(getValues())
  const [provinces, setProvinces] = useState<string[]>([])
  const [districts, setDistricts] = useState<string[]>([])
  const [subdistricts, setSubdistricts] = useState<string[]>([])
  const [postalCodes, setPostalCodes] = useState<string[]>([])
  const [province, setProvince] = useState<string>('')
  const [district, setDistrict] = useState<string>('')
  const [subdistrict, setSubdistrict] = useState<string>('')
  const [postalCode, setPostalCode] = useState<string>('')
  const [gotMedication, setMedication] = useState<string>('none')

  const THAddresses = useMemo(() => getAddress(), [])

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
  const hasPostalCodeChanged = useHasChanged(postalCode)

  useEffect(() => {
    console.log(formData)

    if (!componentDidMount) {
      let tempProvinces: string[] = []
      for (let i = 0; i < THAddresses.length; i++) {
        tempProvinces.push(THAddresses[i][0] as string)
      }

      setProvinces(tempProvinces)
    }

    setComponentDidMount(true)

    if (hasProvinceChanged) {
      let tempDistricts: string[] = []

      for (let i = 0; i < THAddresses.length; i++) {
        if (THAddresses[i][0] === province) {
          for (let j = 0; j < THAddresses[i][1].length; j++) {
            tempDistricts.push(THAddresses[i][1][j][0] as string)
          }
        }
      }

      setDistricts(tempDistricts)
      setDistrict('')
      setSubdistrict('')
      setPostalCode('')
    }

    if (hasDistrictChanged) {
      let tempSubdistricts: string[] = []

      for (let i = 0; i < THAddresses.length; i++) {
        if (THAddresses[i][0] === province) {
          for (let j = 0; j < THAddresses[i][1].length; j++) {
            if (THAddresses[i][1][j][0] === district) {
              for (let k = 0; k < THAddresses[i][1][j][1].length; k++) {
                tempSubdistricts.push(THAddresses[i][1][j][1][k][0] as string)
              }
            }
          }
        }
      }
      setSubdistricts(tempSubdistricts)
      setSubdistrict('')
      setPostalCode('')
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
      setPostalCode('')
    }

    console.log(province + district + subdistrict)
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
  ])

  const onSubmit = async (data: registerFormData) => {
    console.log(data)
    const convertedData = convertFormDataToAPIData(data)
    const response = await registerPatient(convertedData)
    setFormData(data)
  }

  function onVaccinationChange(data: string) {
    setVaccination(data)
  }

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

  function replaceWithNumbers(text: string) {
    return text.replace(/\D+/g, '')
  }

  function replaceWithLatinCharactersOrNumbers(text: string) {
    return text.replace(/[^A-Za-z0-9]/g, '')
  }

  function handlePassportInput(passportId: string) {
    console.log(nationalIdOrPassportFieldStatus)

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

  function isNumeric(str: string) {
    return /^\d+$/.test(str)
  }

  return (
    <>
      <Card>
        <Container className={styles.title_div} style={{ flexDirection: 'column' }}>
          <div className={styles.title}>ลงทะเบียน</div>
          <div className={styles.subtitle}>กรุณากรอกข้อมูลให้ครบถ้วน</div>
        </Container>

        <form id="registrationForm" onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <FormLabel className={styles.form_label} component="legend">
              ข้อมูลทั่วไป
            </FormLabel>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="ชื่อ"
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
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="นามสกุล"
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
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="หมายเลขบัตรประชาชน 13 หลัก / Passport Number"
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
            <Controller
              name="age"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="อายุ"
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
                  label="น้ำหนัก"
                  className={styles.text_field}
                  value={value}
                  fullWidth
                  onChange={(e) => {
                    onChange(replaceWithNumbers(e.target.value))
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
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
                  label="ส่วนสูง"
                  className={styles.text_field}
                  value={value}
                  fullWidth
                  onChange={(e) => {
                    onChange(replaceWithNumbers(e.target.value))
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
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
                  <InputLabel htmlFor="outlined-age-native-simple">เพศ</InputLabel>
                  <Select
                    onChange={onChange}
                    value={value}
                    native
                    label="เพศ"
                    inputProps={{
                      name: 'gender',
                      id: 'outlined-age-native-simple',
                    }}
                  >
                    <option aria-label="" value="" />
                    <option value="MALE">ชาย</option>
                    <option value="FEMALE">หญิง</option>
                    <option value="OTHER">อื่นๆ</option>
                  </Select>
                </FormControl>
              )}
              rules={{ required: 'โปรดใส่เพศ' }}
            />
            <Controller
              name="congenitalDisease"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="โรคประจำตัว"
                  className={styles.text_field}
                  value={value}
                  fullWidth
                  onChange={onChange}
                />
              )}
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
                  label="ที่อยู่ปัจจุบัน"
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
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Autocomplete
                    id="provinces_autocomplete"
                    options={provinces}
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
                        label="จังหวัด"
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
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Autocomplete
                    id="districts_autocomplete"
                    options={districts}
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
                        label="เขต / อำเภอ"
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
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Autocomplete
                    id="subdistricts_autocomplete"
                    options={subdistricts}
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
                        label="แขวง / ตำบล"
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
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Autocomplete
                    id="postalCodes_autocomplete"
                    options={postalCodes}
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
                        label="รหัสไปรษณีย์"
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
                  label="เบอร์โทรติดต่อ (ไม่ต้องมีขีดหรือวรรค)"
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
            <Controller
              name="lineID"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="ไอดีไลน์"
                  className={styles.text_field}
                  value={value}
                  fullWidth
                  onChange={onChange}
                />
              )}
            />
            <Controller
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
            />
            <Controller
              name="hasHelper"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControl className={styles.text_field}>
                  <FormLabel component="legend">ฉัน...</FormLabel>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox name="hasHelper" />} label="มีผู้ดูแล" />
                    <FormControlLabel
                      control={<Checkbox name="digitalLiteracy" />}
                      label="สามารถกรอกข้อมูลเองได้"
                    />
                  </FormGroup>
                </FormControl>
              )}
            />
            <Controller
              name="vaccination"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormControl className={styles.text_field} fullWidth>
                  <FormLabel component="legend">สถานะการฉีดวัคซีน</FormLabel>
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
                    <FormControl className={styles.text_field} fullWidth>
                      <InputLabel htmlFor="outlined-age-native-simple">
                        ชื่อวัคซีนที่ฉีดเข็มโดสแรก
                      </InputLabel>
                      <Select
                        onChange={onChange}
                        value={value}
                        native
                        label=""
                        inputProps={{
                          name: 'vaccinationDates.firstDoseName',
                          id: 'outlined-age-native-simple',
                        }}
                      >
                        <option aria-label="" value="" />
                        <option value="sinovac">Sinovac</option>
                        <option value="az">Astra Zeneca</option>
                      </Select>
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
                      />
                      <FormHelperText error={error ? true : false}>
                        {error ? error.message : ''}
                      </FormHelperText>
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
                    <FormControl className={styles.text_field} fullWidth>
                      <InputLabel htmlFor="outlined-age-native-simple">
                        ชื่อวัคซีนที่ฉีดเข็มโดสที่สอง
                      </InputLabel>
                      <Select
                        onChange={onChange}
                        value={value}
                        native
                        label=""
                        inputProps={{
                          name: 'vaccinationDates.secondDoseName',
                          id: 'outlined-age-native-simple',
                        }}
                      >
                        <option aria-label="" value="" />
                        <option value="sinovac">Sinovac</option>
                        <option value="az">Astra Zeneca</option>
                      </Select>
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
                      />
                      <FormHelperText error={error ? true : false}>
                        {error ? error.message : ''}
                      </FormHelperText>
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
                <FormControl className={styles.text_field} fullWidth>
                  <FormLabel component="legend">สถานะการรับยา Favipiravia</FormLabel>
                  <Select
                    onChange={(e) => {
                      onChange(e.target.value)
                      setMedication(e.target.value as string)
                    }}
                    value={value}
                    native
                    label="สถานะการรับยา Favipiravia"
                    inputProps={{
                      name: 'vaccination',
                      id: 'outlined-age-native-simple',
                    }}
                  >
                    <option aria-label="" value="" />
                    <option value="none">ไม่ได้รับยา</option>
                    <option value="received">รับยา</option>
                  </Select>
                  <FormHelperText error={error ? true : false}>
                    {error ? error.message : ''}
                  </FormHelperText>
                </FormControl>
              )}
              rules={{ required: 'โปรดใส่สถานะการรับยา Favipiravia' }}
            />
            {gotMedication === 'received' && (
              <Controller
                name="favipiraviaAmount"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    label="ปริมาณยา Favipiravia ที่ได้รับ"
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
                rules={{ required: 'โปรดใส่ปริมาณยา Favipiravia ที่ได้รับ' }}
              />
            )}
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
          </Container>
        </form>
      </Card>
    </>
  )
}
