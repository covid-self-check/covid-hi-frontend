export type registerDto = {
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
  hasHelper: boolean
  digitalLiteracy: boolean
  personalPhoneNo: string
  personalLineID: string
  closestUnriskPersonPhoneNo: string
  dose1Status?: string
  dose1Date?: string
  dose2Status?: string
  dose2Date?: string
  gotFavipiravia: boolean
  favipiraviaAmount?: number
}

export type registerFormData = {
  firstName: string
  lastName: string
  personalID: string
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
    firstName,
    lastName,
    personalID,
    station: 'test', // no form yet
    age: parseInt(age),
    gender,
    weight: parseInt(weight),
    height: parseInt(height),
    congenitalDisease,
    address: `${address} ${addressInfo.subdistrict} ${addressInfo.district} ${addressInfo.province} ${addressInfo.postalCode}`,
    hasHelper,
    digitalLiteracy,
    personalPhoneNo: contactInfo.phoneNumber,
    personalLineID: lineID,
    closestUnriskPersonPhoneNo: contactInfo.closeContactsPhoneNumber,
    dose1Status:
      vaccination === 'one_dose' || vaccination === 'two_doses'
        ? vaccinationDates.firstDoseName
        : '',
    dose1Date:
      vaccination === 'one_dose' || vaccination === 'two_doses'
        ? vaccinationDates.firstDoseDate
        : '',
    dose2Status: vaccination === 'two_doses' ? vaccinationDates.secondDoseName : '',
    dose2Date: vaccination === 'two_doses' ? vaccinationDates.secondDoseDate : '',
    gotFavipiravia: gotFavipiravia === 'received', // no form yet
    favipiraviaAmount: favipiraviaAmount ? parseInt(favipiraviaAmount) : 0, // no form yet
  }
  return convertedData
}

export const convertUpdateFormDataToDto = (data: updateData) => {
  const convertedData: updateDto = { ...data, lineId: 'hello' }
  return convertedData
}
