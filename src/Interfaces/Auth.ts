export interface ILoginInputs{
  email: string
  password: string
}

export interface IForgetInputs{
  email: string
}

export interface IResetInputs extends ILoginInputs{
  confirmPassword: string
  seed: string
}


export interface IRegisterInputs extends ILoginInputs{
  userName:string
  country:string
  phoneNumber:number
  profileImage:string
  confirmPassword: string,
}

export interface IVerifyInputs{
  email: string
  code:string
}