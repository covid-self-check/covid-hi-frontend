export type registerDto = {
  lineUserID: string
  lineIDToken: string
  firstName: string
  lastName: string
  personalID: string | null
  passport: string | null
  // station: string
  birthDate: string
  gender: string
  weight: number
  height: number
  address: string
  province: string
  prefecture: string
  district: string
  postNo: string
  hasHelper: boolean
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

export type registerFormData = {
  firstName: string
  lastName: string
  personalID: string
  stationName: string
  birthDate: string
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
  hasHelper: string
  digitalLiteracy: string
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
  sym1_severe_cough: boolean
  sym1_chest_tightness: boolean
  sym1_poor_appetite: boolean
  sym1_fatigue: boolean
  sym1_persistent_fever: boolean
  sym2_tired_body_ache: boolean
  sym2_cough: boolean
  sym2_fever: boolean
  sym2_liquid_stool: boolean
  sym2_cannot_smell: boolean
  sym2_rash: boolean
  sym2_red_eye: boolean

  fac_age_gte_60: boolean
  fac_bmi_gte_30: boolean
  fac_diabetes: boolean
  fac_dyslipidemia: boolean
  fac_hypertension: boolean
  fac_heart_disease: boolean
  fac_esrd: boolean
  fac_cancer: boolean
  fac_cirrhosis: boolean
  fac_tuberculosis: boolean
  fac_hiv: boolean
  fac_asthma: boolean
  fac_copd: boolean
  fac_pregnancy: boolean
  fac_bed_ridden_status: boolean
  fac_fever: boolean
  fac_uri_symptoms: boolean
  fac_olfactory_symptoms: boolean
  fac_diarrhea: boolean
  fac_dyspnea: boolean
  fac_chest_discomfort: boolean
  fac_gi_symptoms: boolean
}

export type lineUserData = {
  lineUserID: string
  lineIDToken: string
}

export type updateDto = {
  bodyTemperature: number
  pulse: number
  sp_o2: number
  sp_o2_ra: number
  sp_o2_after_eih: number
  eih_result: string
  sym1_severe_cough: number
  sym1_chest_tightness: number
  sym1_poor_appetite: number
  sym1_fatigue: number
  sym1_persistent_fever: number
  sym2_tired_body_ache: number
  sym2_cough: number
  sym2_fever: number
  sym2_liquid_stool: number
  sym2_cannot_smell: number
  sym2_rash: number
  sym2_red_eye: number
} & lineUserData

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
    birthDate,
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
    personalID: hasNationalID ? personalID : null,
    passport: !hasNationalID ? personalID : null,
    // station: stationName,
    birthDate,
    gender,
    weight: parseInt(weight),
    height: parseInt(height),
    address: address,
    province: addressInfo.province,
    prefecture: addressInfo.district,
    district: addressInfo.subdistrict,
    postNo: addressInfo.postalCode,
    hasHelper: hasHelper === 'true',
    // digitalLiteracy: digitalLiteracy === 'true',
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
  const {
    bodyTemperature,
    pulse,
    spO2,
    sym1_severe_cough,
    sym1_chest_tightness,
    sym1_poor_appetite,
    sym1_fatigue,
    sym1_persistent_fever,
    sym2_tired_body_ache,
    sym2_cough,
    sym2_fever,
    sym2_liquid_stool,
    sym2_cannot_smell,
    sym2_rash,
    sym2_red_eye,
  } = data

  const convertedData: updateDto = {
    bodyTemperature,
    pulse,
    sp_o2: spO2,
    sp_o2_ra: spO2,
    sp_o2_after_eih: spO2,
    eih_result: 'unknown',
    sym1_severe_cough: sym1_severe_cough ? 1 : 0,
    sym1_chest_tightness: sym1_chest_tightness ? 1 : 0,
    sym1_poor_appetite: sym1_poor_appetite ? 1 : 0,
    sym1_fatigue: sym1_fatigue ? 1 : 0,
    sym1_persistent_fever: sym1_persistent_fever ? 1 : 0,
    sym2_tired_body_ache: sym2_tired_body_ache ? 1 : 0,
    sym2_cough: sym2_cough ? 1 : 0,
    sym2_fever: sym2_fever ? 1 : 0,
    sym2_liquid_stool: sym2_liquid_stool ? 1 : 0,
    sym2_cannot_smell: sym2_cannot_smell ? 1 : 0,
    sym2_rash: sym2_rash ? 1 : 0,
    sym2_red_eye: sym2_red_eye ? 1 : 0,
    lineUserID,
    lineIDToken,
  }
  return convertedData
}
