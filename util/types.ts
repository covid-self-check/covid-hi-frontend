export type registerData = {
  firstName: string;
  lastName: string;
  personalID: string;
  age: number;
  gender: string;
  height: number;
  congenitalDisease: string;
  address: string;
  hasHelper: boolean;
  digitalLiteracy: boolean;
  personalPhoneNo: string;
  personalLineID: string;
  closestUnriskPersonPhoneNo: string;
};

export type updateData = {
  spO2: number; //o2 in blood stream
  bodyTemp: number; //body temp
  pulseRate: number; //pulse rate
  checklist: string[]; // a list of covid symptoms
  exhaustionLevel: number; //ระดับความรู้สึกว่าเหนื่อยไหม
};
