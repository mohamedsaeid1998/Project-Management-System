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
  title?:string
  description?:string
  isFocus?:any
}

export interface IInputsProps {
  register: UseFormRegister<IFormValues>
  inputName: 'password' | "newPassword" | "oldPassword" | "email"
  placeholder?: string
  getValues?: UseFormGetValues<IFormValues>
  errors: FieldErrors<IFormValues>
  isFocus?:any
  setInputFocused?:any
}


export interface IContextProps {
  children: ReactNode;
}


export interface INewProject {
  title: string,
  description: string
}

export interface INewTask {
  title: string,
  description: string,
  employeeId: number,
  projectId: number
}