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
  gotFavipiravir: number
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
  // stationName: string
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
  // congenitalDisease: string
  hasHelper: string
  // digitalLiteracy: string
  contactInfo: {
    phoneNumber: string
    // closeContactsPhoneNumber: string
    emergencyContactPhoneNumber: string
  }
  // lineID: string
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
  // bodyTemperature: number
  // pulse: number
  spO2: number
  spO2Eih: number
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

  // fac_age_gte_60: boolean
  // fac_bmi_gte_30: boolean
  // fac_diabetes: boolean
  // fac_dyslipidemia: boolean
  // fac_hypertension: boolean
  // fac_heart_disease: boolean
  // fac_esrd: boolean
  // fac_cancer: boolean
  // fac_cirrhosis: boolean
  // fac_tuberculosis: boolean
  // fac_hiv: boolean
  // fac_asthma: boolean
  // fac_copd: boolean
  // fac_pregnancy: boolean
  fac_bed_ridden_status: boolean
  // fac_fever: boolean
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
  // bodyTemperature: number
  // pulse: number
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
  // fac_age_gte_60: number
  // fac_bmi_gte_30: number
  // fac_diabetes: number
  // fac_dyslipidemia: number
  // fac_hypertension: number
  // fac_heart_disease: number
  // fac_esrd: number
  // fac_cancer: number
  // fac_cirrhosis: number
  // fac_tuberculosis: number
  // fac_hiv: number
  // fac_asthma: number
  // fac_copd: number
  // fac_pregnancy: number
  fac_bed_ridden_status: number
  // fac_fever: number
  fac_uri_symptoms: number
  fac_olfactory_symptoms: number
  fac_diarrhea: number
  fac_dyspnea: number
  fac_chest_discomfort: number
  fac_gi_symptoms: number
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

export type requestHelpData = {
  name: string
  personalPhoneNo: string
}

export type requestHelpDto = {
  name: string
  personalPhoneNo: string
} & lineUserData

export const convertFormDataToAPIData: (
  data: registerFormData,
  lineData: lineUserData,
) => registerDto = (data, lineData) => {
  const {
    firstName,
    lastName,
    personalID,
    birthDate,
    weight,
    height,
    gender,
    address,
    addressInfo,
    hasHelper,
    contactInfo,
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

  const convertedBirthDate = (birthDate as unknown as Date).toLocaleDateString('en')

  const convertedData: registerDto = {
    lineUserID,
    lineIDToken,
    firstName,
    lastName,
    personalID: hasNationalID ? personalID : null,
    passport: !hasNationalID ? personalID : null,
    // station: stationName,
    birthDate: new Date(convertedBirthDate).toLocaleDateString('en'),
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
    gotFavipiravir: gotFavipiravia === 'received' ? 1 : 0,
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
    // bodyTemperature,
    // pulse,
    spO2,
    spO2Eih,
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
    // fac_age_gte_60,
    // fac_bmi_gte_30,
    // fac_diabetes,
    // fac_dyslipidemia,
    // fac_hypertension,
    // fac_heart_disease,
    // fac_esrd,
    // fac_cancer,
    // fac_cirrhosis,
    // fac_tuberculosis,
    // fac_hiv,
    // fac_asthma,
    // fac_copd,
    // fac_pregnancy,
    fac_bed_ridden_status,
    // fac_fever,
    fac_uri_symptoms,
    fac_olfactory_symptoms,
    fac_diarrhea,
    fac_dyspnea,
    fac_chest_discomfort,
    fac_gi_symptoms,
  } = data

  const oxygenResult =
    spO2Eih - spO2 > 0
      ? 'positive'
      : spO2Eih - spO2 === 0
      ? 'neutral'
      : spO2Eih - spO2 < 0
      ? 'negative'
      : 'unknown'

  const convertedData: updateDto = {
    // bodyTemperature,
    // pulse,
    sp_o2: spO2,
    sp_o2_ra: spO2,
    sp_o2_after_eih: spO2Eih,
    eih_result: oxygenResult,
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
    // fac_age_gte_60: fac_age_gte_60 ? 1 : 0,
    // fac_bmi_gte_30: fac_bmi_gte_30 ? 1 : 0,
    // fac_diabetes: fac_diabetes ? 1 : 0,
    // fac_dyslipidemia: fac_dyslipidemia ? 1 : 0,
    // fac_hypertension: fac_hypertension ? 1 : 0,
    // fac_heart_disease: fac_heart_disease ? 1 : 0,
    // fac_esrd: fac_esrd ? 1 : 0,
    // fac_cancer: fac_cancer ? 1 : 0,
    // fac_cirrhosis: fac_cirrhosis ? 1 : 0,
    // fac_tuberculosis: fac_tuberculosis ? 1 : 0,
    // fac_hiv: fac_hiv ? 1 : 0,
    // fac_asthma: fac_asthma ? 1 : 0,
    // fac_copd: fac_copd ? 1 : 0,
    // fac_pregnancy: fac_pregnancy ? 1 : 0,
    fac_bed_ridden_status: fac_bed_ridden_status ? 1 : 0,
    // fac_fever: fac_fever ? 1 : 0,
    fac_uri_symptoms: fac_uri_symptoms ? 1 : 0,
    fac_olfactory_symptoms: fac_olfactory_symptoms ? 1 : 0,
    fac_diarrhea: fac_diarrhea ? 1 : 0,
    fac_dyspnea: fac_dyspnea ? 1 : 0,
    fac_chest_discomfort: fac_chest_discomfort ? 1 : 0,
    fac_gi_symptoms: fac_gi_symptoms ? 1 : 0,
    lineUserID,
    lineIDToken,
  }
  return convertedData
}

export const convertProfileToFormData: (profile: registerDto) => registerFormData = (
  profile: registerDto,
) => {
  const {
    lineUserID,
    lineIDToken,
    firstName,
    lastName,
    personalID,
    passport,
    birthDate,
    gender,
    weight,
    height,
    address,
    province,
    prefecture,
    district,
    postNo,
    hasHelper,
    personalPhoneNo,
    emergencyPhoneNo,
    dose1Name,
    dose1Date,
    dose2Name,
    dose2Date,
    gotFavipiravir,
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
  } = profile

  return {
    firstName,
    lastName,
    personalID: (personalID !== 'undefined' ? personalID : passport) as string,
    birthDate: birthDate ? convertDateFormat(birthDate) : '',
    weight: `${weight}`,
    height: `${height}`,
    gender,
    address,
    addressInfo: { province, district: prefecture, subdistrict: district, postalCode: postNo },
    hasHelper: hasHelper ? 'true' : 'false',
    contactInfo: { phoneNumber: personalPhoneNo, emergencyContactPhoneNumber: emergencyPhoneNo },
    vaccination:
      dose2Name!?.length > 0 ? 'two_doses' : dose1Name!?.length > 0 ? 'one_dose' : 'none',
    vaccinationDates: {
      firstDoseName: dose1Name || '',
      firstDoseDate: dose1Date ? convertDateFormat(dose1Date) : '',
      secondDoseName: dose2Name || '',
      secondDoseDate: dose2Date ? convertDateFormat(dose2Date) : '',
    },
    gotFavipiravia: gotFavipiravir > 0 ? 'received' : 'none',
    favipiraviaAmount: `${favipiraviaAmount}`,
    rf_copd_chronic_lung_disease: rf_copd_chronic_lung_disease === 1,
    rf_ckd_stagr_3_to_4: rf_ckd_stagr_3_to_4 === 1,
    rf_chronic_heart_disease: rf_chronic_heart_disease === 1,
    rf_cva: rf_cva === 1,
    rf_t2dm: rf_t2dm === 1,
    rf_cirrhosis: rf_cirrhosis === 1,
    rf_immunocompromise: rf_immunocompromise === 1,
    fac_diabetes: fac_diabetes === 1,
    fac_dyslipidemia: fac_dyslipidemia === 1,
    fac_hypertension: fac_hypertension === 1,
    fac_heart_diseases: fac_heart_diseases === 1,
    fac_esrd: fac_esrd === 1,
    fac_cancer: fac_cancer === 1,
    fac_tuberculosis: fac_tuberculosis === 1,
    fac_hiv: fac_hiv === 1,
    fac_asthma: fac_asthma === 1,
    fac_pregnancy: fac_pregnancy === 1,
  }
}

export const convertRequestHelpDataToDto: (
  data: requestHelpData,
  lineData: lineUserData,
) => requestHelpDto = (data, lineData) => {
  const { name, personalPhoneNo } = data

  const convertedData = { ...lineData, name, personalPhoneNo }

  return convertedData
}

export const convertDateFormat = (date: string) =>
  `${date?.substring(6, 10)}-${date?.substring(3, 5)}-${date?.substring(0, 2)}`
