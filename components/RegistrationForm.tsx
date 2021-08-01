import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
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
} from "@material-ui/core";
import Card from "./Card";
import styles from "../styles/RegistrationForm.module.css";
import { registerData } from "../util/types";

export default function RegistrationForm() {
  const { register, handleSubmit, control, getValues } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      personalID: "",
      age: null,
      weight: null,
      height: null,
      gender: "",
      address: "",
      congenitalDisease: "",
      hasHelper: false,
      contactInfo: {
        phoneNumber: "",
        closeContactsPhoneNumber: "",
      },
      lineID: "",
      vaccination: "none",
      vaccinationDates: {
        firstDose: "",
        secondDose: "",
      },
    },
  });
  const [vaccination, setVaccination] = useState<string>("none");
  const [formData, setFormData] = useState(getValues());

  function onSubmit(data: registerData) {
    console.log(data);
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  function onVaccinationChange(data: string) {
    setVaccination(data);
  }

  function replaceWithNumbers(text: string) {
    var removedText = text.replace(/\D+/g, "");
    return removedText;
  }

  return (
    <>
      <Card>
        <Container
          className={styles.title_div}
          style={{ flexDirection: "column" }}
        >
          <div className={styles.title}>ลงทะเบียน</div>
          <div className={styles.subtitle}>กรุณากรอกข้อมูลให้ครบถ้วน</div>
        </Container>

        <form id="registrationForm" onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
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
              rules={{ required: "โปรดใส่ชื่อ" }}
            />

            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
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
              rules={{ required: "โปรดใส่นามสกุล" }}
            />

            <Controller
              name="personalID"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="หมายเลขบัตรประชาชน 13 หลัก / Passport Number"
                  className={styles.text_field}
                  value={value}
                  fullWidth
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{
                required:
                  "โปรดกรอกหมายเลขบัตรประชาชน 13 หลัก / Passport Number",
              }}
            />

            <Controller
              name="age"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="อายุ"
                  className={styles.text_field}
                  value={value}
                  fullWidth
                  inputProps={{ maxLength: 3 }}
                  onChange={(e) => {
                    onChange(replaceWithNumbers(e.target.value));
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: "โปรดใส่อายุ" }}
            />

            <Controller
              name="weight"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="น้ำหนัก"
                  className={styles.text_field}
                  value={value}
                  fullWidth
                  onChange={(e) => {
                    onChange(replaceWithNumbers(e.target.value));
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">กก.</InputAdornment>
                    ),
                  }}
                />
              )}
              rules={{ required: "โปรดใส่น้ำหนัก" }}
            />

            <Controller
              name="height"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="ส่วนสูง"
                  className={styles.text_field}
                  value={value}
                  fullWidth
                  onChange={(e) => {
                    onChange(replaceWithNumbers(e.target.value));
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">ซม.</InputAdornment>
                    ),
                  }}
                />
              )}
              rules={{ required: "โปรดใส่ส่วนสูง" }}
            />

            <Controller
              name="gender"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-age-native-simple">
                    เพศ
                  </InputLabel>
                  <Select
                    onChange={onChange}
                    value={value}
                    native
                    label="เพศ"
                    inputProps={{
                      name: "gender",
                      id: "outlined-age-native-simple",
                    }}
                  >
                    <option aria-label="" value="" />
                    <option value="male">ชาย</option>
                    <option value="female">หญิง</option>
                  </Select>
                </FormControl>
              )}
              rules={{ required: "โปรดใส่เพศ" }}
            />

            <Controller
              name="address"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
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
              rules={{ required: "โปรดใส่ที่อยู่ปัจจุบัน" }}
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

            <Controller
              name="contactInfo.phoneNumber"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="เบอร์โทรติดต่อ (ไม่ต้องมีขีดหรือวรรค)"
                  className={styles.text_field}
                  value={value}
                  inputProps={{ maxLength: 10 }}
                  fullWidth
                  onChange={(e) => {
                    onChange(replaceWithNumbers(e.target.value));
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: "โปรดใส่เบอร์โทรติดต่อ" }}
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
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="เบอร์โทรติดต่อคนใกล้ชิด (ไม่ต้องมีขีดหรือวรรค)"
                  className={styles.text_field}
                  value={value}
                  fullWidth
                  inputProps={{ maxLength: 10 }}
                  onChange={(e) => {
                    onChange(replaceWithNumbers(e.target.value));
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: "โปรดใส่เบอร์โทรติดต่อคนใกล้ชิด" }}
            />

            <Controller
              name="hasHelper"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl className={styles.text_field}>
                  <FormLabel component="legend">ฉัน...</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox name="hasHelper" />}
                      label="มีผู้ดูแล"
                    />
                    <FormControlLabel
                      control={<Checkbox name="digitalLiteracy" />}
                      label="สามารถกรอกข้อมูลเองได้"
                    />
                  </FormGroup>
                  <FormHelperText error={error ? true : false}>
                    {error ? error.message : ""}
                  </FormHelperText>
                </FormControl>
              )}
              rules={{ required: "โปรดใส่ข้อมูล" }}
            />

            <Controller
              name="vaccination"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl className={styles.text_field} fullWidth>
                  <FormLabel component="legend">สถานะการฉีดวัคซีน</FormLabel>
                  <Select
                    onChange={(e) => {
                      onChange(e.target.value);
                      onVaccinationChange(e.target.value);
                    }}
                    value={value}
                    native
                    label="สถานะการฉีดวัคซีน"
                    inputProps={{
                      name: "vaccination",
                      id: "outlined-age-native-simple",
                    }}
                  >
                    <option aria-label="" value="" />
                    <option value="none">ยังไม่ได้ฉีด</option>
                    <option value="one_dose">ฉีดแล้ว 1 เข็ม</option>
                    <option value="two_doses">ฉีดแล้ว 2 เข็ม</option>
                  </Select>
                  <FormHelperText error={error ? true : false}>
                    {error ? error.message : ""}
                  </FormHelperText>
                </FormControl>
              )}
              rules={{ required: "โปรดใส่สถานะการฉีดวัคซีน" }}
            />
            {vaccination === "one_dose" && (
              <>
                <Controller
                  name="vaccinationDates.firstDose"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
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
                        {error ? error.message : ""}
                      </FormHelperText>
                    </>
                  )}
                  rules={{ required: "โปรดใส่วันที่ฉีดวัคซีนโดสแรก" }}
                />
              </>
            )}

            {vaccination === "two_doses" && (
              <>
                <Controller
                  name="vaccinationDates.firstDose"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
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
                        {error ? error.message : ""}
                      </FormHelperText>
                    </>
                  )}
                  rules={{ required: "โปรดใส่วันที่ฉีดวัคซีนโดสแรก" }}
                />

                <Controller
                  name="vaccinationDates.secondDose"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
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
                        {error ? error.message : ""}
                      </FormHelperText>
                    </>
                  )}
                  rules={{ required: "โปรดใส่วันที่ฉีดวัคซีนโดสที่สอง" }}
                />
              </>
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
  );
}
