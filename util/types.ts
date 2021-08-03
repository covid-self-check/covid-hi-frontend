export type registerDto = {
  lineUserID: string
  lineIDToken: string
  firstName: string
  lastName: string
  personalID: string
  passport: string
  station: string
  age: number
  gender: string
  weight: number
  height: number
  address: string
  province: string
  prefecture: string
  district: string
  postNo: string
  // hasHelper: boolean
  // digitalLiteracy: boolean
  personalPhoneNo: string
  // personalLineID: string
  // closestUnriskPersonPhoneNo: string
  emergencyPhoneNo: string
  dose1Name?: string
  dose1Date?: string
  dose2Name?: string
  dose2Date?: string
  gotFavipiravia: number
  favipiraviaAmount?: number
  rf_copd_chronic_lung_disease: number
  rf_ckd_stagr_3_to_4: number
  rf_chronic_heart_disease: number
  rf_cva: number
  rf_t2dm: number
  rf_cirrhosis: number
  rf_immunocompromise: number
  fac_diabetes: number
  fac_dyslipidemia: number
  fac_hypertension: number
  fac_heart_diseases: number
  fac_esrd: number
  fac_cancer: number
  fac_tuberculosis: number
  fac_hiv: number
  fac_asthma: number
  fac_pregnancy: number
}

export type lineUserData = {
  lineUserID: string
  lineIDToken: string
}

export type registerFormData = {
  firstName: string
  lastName: string
  personalID: string
  stationName: string
  age: string
  weight: string
  height: string
  gender: string
  address: string
  addressInfo: {
    province: string
    district: string
    subdistrict: string
    postalCode: string
  }
  congenitalDisease: string
  hasHelper: boolean
  digitalLiteracy: boolean
  contactInfo: {
    phoneNumber: string
    closeContactsPhoneNumber: string
    emergencyContactPhoneNumber: string
  }
  lineID: string
  vaccination: string
  vaccinationDates: {
    firstDoseName: string
    firstDoseDate: string
    secondDoseName: string
    secondDoseDate: string
  }
  gotFavipiravia: string
  favipiraviaAmount: string
  rf_copd_chronic_lung_disease: boolean
  rf_ckd_stagr_3_to_4: boolean
  rf_chronic_heart_disease: boolean
  rf_cva: boolean
  rf_t2dm: boolean
  rf_cirrhosis: boolean
  rf_immunocompromise: boolean
  fac_diabetes: boolean
  fac_dyslipidemia: boolean
  fac_hypertension: boolean
  fac_heart_diseases: boolean
  fac_esrd: boolean
  fac_cancer: boolean
  fac_tuberculosis: boolean
  fac_hiv: boolean
  fac_asthma: boolean
  fac_pregnancy: boolean
}

export type updateData = {
  bodyTemperature: number
  pulse: number
  spO2: number
  cough: boolean
  soreThroat: boolean
  headAche: boolean
  hasHelper: boolean
}

export type updateDto = lineUserData & updateData

export type historyItem = {
  soreThroat: boolean
  pulse: number
  bodyTemperature: number
  createdDate: {
    _seconds: number
    _nanoseconds: number
  }
  cough: boolean
  hasHelper: boolean
  headAche: boolean
  spO2: number
}

export type apiResponse = {
  result: {
    ok: boolean
    id?: string
    result?: historyItem[]
  }
}

export const convertFormDataToAPIData: (
  data: registerFormData,
  lineData: lineUserData,
) => registerDto = (data, lineData) => {
  const {
    firstName,
    lastName,
    personalID,
    stationName,
    age,
    weight,
    height,
    gender,
    address,
    addressInfo,
    congenitalDisease,
    hasHelper,
    contactInfo,
    lineID,
    digitalLiteracy,
    vaccination,
    vaccinationDates,
    gotFavipiravia,
    favipiraviaAmount,
    rf_copd_chronic_lung_disease,
    rf_ckd_stagr_3_to_4,
    rf_chronic_heart_disease,
    rf_cva,
    rf_t2dm,
    rf_cirrhosis,
    rf_immunocompromise,
    fac_diabetes,
    fac_dyslipidemia,
    fac_hypertension,
    fac_heart_diseases,
    fac_esrd,
    fac_cancer,
    fac_tuberculosis,
    fac_hiv,
    fac_asthma,
    fac_pregnancy,
  } = data
  const { lineUserID, lineIDToken } = lineData

  const hasNationalID = personalID.length === 13

  const convertedData: registerDto = {
    lineUserID,
    lineIDToken,
    firstName,
    lastName,
    personalID: hasNationalID ? personalID : 'undefined',
    passport: !hasNationalID ? personalID : 'undefined',
    station: stationName,
    age: parseInt(age),
    gender,
    weight: parseInt(weight),
    height: parseInt(height),
    address: address,
    province: addressInfo.province,
    prefecture: addressInfo.district,
    district: addressInfo.subdistrict,
    postNo: addressInfo.postalCode,
    // hasHelper,
    // digitalLiteracy,
    personalPhoneNo: contactInfo.phoneNumber,
    // personalLineID: lineID,
    // closestUnriskPersonPhoneNo: contactInfo.closeContactsPhoneNumber,
    emergencyPhoneNo: contactInfo.emergencyContactPhoneNumber,
    dose1Name:
      vaccination === 'one_dose' || vaccination === 'two_doses'
        ? vaccinationDates.firstDoseName
        : '',
    dose1Date:
      vaccination === 'one_dose' || vaccination === 'two_doses'
        ? vaccinationDates.firstDoseDate
        : '',
    dose2Name: vaccination === 'two_doses' ? vaccinationDates.secondDoseName : '',
    dose2Date: vaccination === 'two_doses' ? vaccinationDates.secondDoseDate : '',
    gotFavipiravia: gotFavipiravia === 'received' ? 1 : 0,
    favipiraviaAmount: favipiraviaAmount ? parseInt(favipiraviaAmount) : 0,
    rf_copd_chronic_lung_disease: rf_copd_chronic_lung_disease ? 1 : 0,
    rf_ckd_stagr_3_to_4: fac_esrd ? 1 : 0,
    rf_chronic_heart_disease: fac_heart_diseases ? 1 : 0,
    rf_cva: rf_cva ? 1 : 0,
    rf_t2dm: fac_diabetes ? 1 : 0,
    rf_cirrhosis: rf_cirrhosis ? 1 : 0,
    rf_immunocompromise: rf_immunocompromise ? 1 : 0,
    fac_diabetes: fac_diabetes ? 1 : 0,
    fac_dyslipidemia: fac_dyslipidemia ? 1 : 0,
    fac_hypertension: fac_hypertension ? 1 : 0,
    fac_heart_diseases: fac_heart_diseases ? 1 : 0,
    fac_esrd: fac_esrd ? 1 : 0,
    fac_cancer: fac_cancer ? 1 : 0,
    fac_tuberculosis: fac_tuberculosis ? 1 : 0,
    fac_hiv: fac_hiv ? 1 : 0,
    fac_asthma: fac_asthma ? 1 : 0,
    fac_pregnancy: fac_pregnancy ? 1 : 0,
  }
  return convertedData
}

export const convertUpdateFormDataToDto = (data: updateData, lineData: lineUserData) => {
  const { lineUserID, lineIDToken } = lineData
  const convertedData: updateDto = { ...data, lineUserID, lineIDToken }
  return convertedData
}
