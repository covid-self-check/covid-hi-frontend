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
  emergencyPhoneNo: string
  closestUnriskPersonPhoneNo: string
  dose1Name: string
  dose1Date: string
  dose2Name: string
  dose2Date: string
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
    emergencyPhoneNo: '', // no form yet
    closestUnriskPersonPhoneNo: contactInfo.closeContactsPhoneNumber,
    dose1Name: vaccinationDates.firstDoseName,
    dose1Date: vaccinationDates.firstDoseDate,
    dose2Name: vaccinationDates.secondDoseName,
    dose2Date: vaccinationDates.secondDoseDate,
  }
  return convertedData
}
