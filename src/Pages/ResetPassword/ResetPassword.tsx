import { AuthComponent, ConfirmPassInput, EmailInput, PasswordInput } from '@/Components'
import { IFormValues } from '@/Interfaces'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import {  useNavigate } from 'react-router-dom'
import { ToastContext } from '@/Context/ToastContext'
import baseUrl from '@/utils/Custom/Custom'
import './ResetPassword.module.scss'

const ResetPassword = () => {

  const navigate = useNavigate()

  const {getToastValue} = useContext(ToastContext)

  const { register, handleSubmit, formState: { errors } ,getValues} = useForm<IFormValues>()
  const [Loading, setLoading] = useState(false)


  const submitReset = (data: IFormValues) => {
    setLoading(true)
    return baseUrl.post(`/api/v1/Users/Reset`, data)
      .then(() => {
        if (getToastValue)
          getToastValue("success", "Welcome")
        navigate('/')
      })
      .catch((err) => {
        if (getToastValue)
          getToastValue("error", err.response.data.message)
      }).finally(() => {
        setLoading(false)
      })
  }

  return <>
      <AuthComponent title={"Reset Password"}>
      <form onSubmit={handleSubmit(submitReset)}>

<EmailInput inputName='email' {...{ errors, register }} />

<div className='input-con'>

<label className="orange mt-3">OTP Verification</label>
<div className=' d-flex flex-column  '>
  <input
    className=' form-control-Auth w-100'
    type="text"
    placeholder='Enter Verification'

    {...register("seed", {
      required: "OTP is Required",
      pattern: {
        value: /^[a-zA-Z0-9]{4}$/,
        message: " OTP must be 4 characters"
      }
    })}
  />

</div>

</div>
{errors?.seed ? <span className='text-danger small'>{errors?.seed?.message}</span> : null}

<PasswordInput inputName='password' placeholder='New Password' {...{ errors, register }} />
<ConfirmPassInput  inputName={'confirmPassword'} placeholder='Confirm New Password' {...{ errors, register ,getValues }}   />


<button type='submit' disabled={Loading} className='btn AuthBtn w-100 mt-4 fw-bold text-white bg-orange rounded-5 btn-lg '>{Loading ? <i className='fa fa-spin fa-spinner'></i> : "Save"}</button>

</form>
      </AuthComponent>
  </>
}

export default ResetPassword