import { AuthComponent, EmailInput } from '@/Components'
import { ToastContext } from '@/Context/ToastContext'
import { IFormValues } from '@/Interfaces'
import baseUrl from '@/utils/Custom/Custom'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import './ForgetPassword.module.scss'
const ForgetPassword = () => {
  const navigate = useNavigate()

  const toast = useContext(ToastContext)

  const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>()
  const [Loading, setLoading] = useState(false)


  const submitForget = (data: IFormValues) => {
    setLoading(true)
    return baseUrl.post(`/api/v1/Users/Reset/Request`, data)
      .then(() => {
        if (toast)
          toast.getToastValue("success", "Mail Send Successfully")
        setLoading(false)
        navigate('/resetPassword')
      })
      .catch((err) => {
        if (toast)
          toast.getToastValue("error", err.response.data.message)
        setLoading(false)
      })
  }


  return <>
      <AuthComponent title={"Forget Password"}>
      <form onSubmit={handleSubmit(submitForget)}>

        <EmailInput inputName='email' {...{ errors, register }} />
        <div className=' mt-4 '>
          <Link to={'/'} className='forget text-decoration-none text-white  '>Login Now ?</Link>
        </div>
        <button type='submit' disabled={Loading} className='btn w-100 mt-4 fw-bold text-white bg-orange rounded-5 btn-lg '>{Loading ? <i className='fa fa-spin fa-spinner'></i> : "Verify"}</button>

      </form>
      </AuthComponent>  
  </>
}

export default ForgetPassword