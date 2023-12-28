import { IFormValues } from '@/Interfaces'
import './ConfirmPassInput.module.scss'

import { FieldErrors, UseFormGetValues, UseFormRegister } from 'react-hook-form'
import { useState } from 'react'


interface IProps {
  register: UseFormRegister<IFormValues>
  inputName: 'password' | "email" | "seed" | 'confirmPassword' | "newPassword" | "oldPassword" | "confirmNewPassword"
  placeholder: string
  getValues: UseFormGetValues<IFormValues>
  errors: FieldErrors<IFormValues>
}


const ConfirmPassInput = ({ register, inputName, placeholder, getValues, errors }: IProps) => {



  const [type, setType] = useState(false)
  const required = "This Field is required"


  return <>

    <div className='input-con'>
        <label className="orange mt-3">Confirm Password</label>
      <div className=' d-flex  align-items-center justify-content-between position-relative'>
      <div className='d-flex gap-2 flex-grow-1 flex-column  '>
          <input
            className='form-control-Auth pass w-100'
            type={type ? "text" : "password"}
            placeholder={placeholder}
            {...register(`${inputName}`, {
              required,
              validate: (value) => value === getValues(inputName === "confirmNewPassword" ? "newPassword" : 'password') || 'Passwords do not match',
            })} />
      </div>
        <i  onClick={() => setType(!type)} className={`fa-regular position-absolute end-0 me-3 ${type ? 'fa-eye-slash' : 'fa-eye'} show `} ></i>
      </div>
    </div>
    {inputName === "confirmPassword" ? errors?.confirmPassword ? <span className='text-danger small'>{errors?.confirmPassword?.message}</span> : null
      : inputName === "confirmNewPassword" ? errors?.confirmNewPassword ? <span className='text-danger small'>{errors?.confirmNewPassword?.message}</span> : null
        : null
    }
  </>
}

export default ConfirmPassInput