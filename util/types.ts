export type registerDto = {
  lineId: string
  firstName: string
  lastName: string
  personalID: string
  station: string
  age: number
  gender: string
  weight: number
  height: number
  congenitalDisease?: string
  address: string
  province: string
  prefecture: string
  district: string
  postNo: string
  hasHelper: boolean
  digitalLiteracy: boolean
  personalPhoneNo: string
  // personalLineID: string
  // closestUnriskPersonPhoneNo: string
  emergencyPhoneNo: string
  dose1Name?: string
  dose1Date?: string
  dose2Name?: string
  dose2Date?: string
  gotFavipiravia: boolean
  favipiraviaAmount?: number
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

export type updateDto = {
  // personalID: string
  lineId: string
} & updateData

export const convertFormDataToAPIData: (data: registerFormData) => registerDto = (data) => {
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
  } = data
  const convertedData: registerDto = {
    lineId: 'placeholder',
    firstName,
    lastName,
    personalID,
    station: stationName,
    age: parseInt(age),
    gender,
    weight: parseInt(weight),
    height: parseInt(height),
    congenitalDisease,
    address: address,
    province: addressInfo.province,
    prefecture: addressInfo.district,
    district: addressInfo.subdistrict,
    postNo: addressInfo.postalCode,
    hasHelper,
    digitalLiteracy,
    personalPhoneNo: contactInfo.phoneNumber,
    // personalLineID: lineID,
    // closestUnriskPersonPhoneNo: contactInfo.closeContactsPhoneNumber,
    emergencyPhoneNo: contactInfo.emergencyContactPhoneNumber,
    dose1Name:
      vaccination === 'one_dose' || vaccination === 'two_doses'
        ? vaccinationDates.firstDoseName
        : undefined,
    dose1Date:
      vaccination === 'one_dose' || vaccination === 'two_doses'
        ? vaccinationDates.firstDoseDate
        : undefined,
    dose2Name: vaccination === 'two_doses' ? vaccinationDates.secondDoseName : undefined,
    dose2Date: vaccination === 'two_doses' ? vaccinationDates.secondDoseDate : undefined,
    gotFavipiravia: gotFavipiravia === 'received',
    favipiraviaAmount: favipiraviaAmount ? parseInt(favipiraviaAmount) : undefined,
  }
  return convertedData
}

export const convertUpdateFormDataToDto = (data: updateData) => {
  const convertedData: updateDto = { ...data, lineId: 'hello' }
  return convertedData
}
