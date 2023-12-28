import { AuthComponent, EmailInput } from '@/Components'
import { ToastContext } from '@/Context/ToastContext'
import { IFormValues } from '@/Interfaces'
import baseUrl from '@/utils/Custom/Custom'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, } from 'react-router-dom'
import './Verify.module.scss'
const Verify = () => {

  const navigate = useNavigate()

  const {getToastValue} = useContext(ToastContext)

  const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>()
  const [Loading, setLoading] = useState(false)


  const submitVerify = (data: IFormValues) => {
    setLoading(true)
    return baseUrl.put(`/api/v1/Users/verify`, data)
      .then(() => {
        if (getToastValue)
          getToastValue("success", "Successfully Verify")
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
      <AuthComponent title={"Verify Account"}>
      <form onSubmit={handleSubmit(submitVerify)}>

        <EmailInput inputName='email' {...{ errors, register }} />
        <div className='input-con'>

<label className="orange mt-3">OTP Verification</label>
<div className=' d-flex flex-column  '>
  <input
    className=' form-control-Auth w-100'
    type="text"
    placeholder='Enter Verification'

    {...register("code", {
      required: "code is Required",
      pattern: {
        value: /^[a-zA-Z0-9]{4}$/,
        message: " code must be 4 char"
      }
    })}
  />

</div>

</div>
{errors?.code ? <span className='text-danger small'>{errors?.code?.message}</span> : null}

        <div className=' mt-2 text-end'>
          <Link to={'/'} className='forget text-decoration-none text-white '>Login ?</Link>
        </div>
        <button type='submit' disabled={Loading} className='btn AuthBtn w-100 mt-4 fw-bold text-white bg-orange rounded-5 btn-lg '>{Loading ? <i className='fa fa-spin fa-spinner'></i> : "Verify"}</button>

      </form>
      </AuthComponent>  </>
}

export default Verify