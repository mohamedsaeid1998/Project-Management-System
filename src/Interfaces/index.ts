import { ReactNode } from "react"
import { FieldErrors, UseFormGetValues, UseFormRegister } from "react-hook-form"



export interface IFormValues {
  email?: string,
  password?: string,
  confirmPassword?: string,
  seed?: string,
  oldPassword?: string,
  newPassword?: string,
  confirmNewPassword?: string,
  userName?:string
  country?:string
  phoneNumber?:number
  profileImage?:string
  code?:string
}

export interface IInputsProps {
  register: UseFormRegister<IFormValues>
  inputName: 'password' | "newPassword" | "oldPassword" | "email"
  placeholder?: string
  getValues?: UseFormGetValues<IFormValues>
  errors: FieldErrors<IFormValues>
}


export interface IContextProps {
  children: ReactNode;
}