export type registerData = {
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

export type updateData = {
  spO2: number //o2 in blood stream
  bodyTemp: number //body temp
  pulseRate: number //pulse rate
  checklist: string[] // a list of covid symptoms
  exhaustionLevel: number //ระดับความรู้สึกว่าเหนื่อยไหม
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
}

export const convertFormDataToAPIData: (data: registerFormData) => registerData = (data) => {
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
    vaccinationDates,
  } = data
  const convertedData: registerData = {
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
    dose1Status: vaccinationDates.firstDoseName,
    dose1Date: vaccinationDates.firstDoseDate,
    dose2Status: vaccinationDates.secondDoseName,
    dose2Date: vaccinationDates.secondDoseDate,
    gotFavipiravia: true, // no form yet
    favipiraviaAmount: 999, // no form yet
  }
  return convertedData
}
