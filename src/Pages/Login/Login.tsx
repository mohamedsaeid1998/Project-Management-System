import { AuthComponent, EmailInput, PasswordInput } from '@/Components'
import { IFormValues } from '@/Interfaces'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, } from 'react-router-dom'
import { AuthContext } from '@/Context/AuthContext'
import { ToastContext } from '@/Context/ToastContext'
import baseUrl from '@/utils/Custom/Custom'
import './Login.module.scss'


const Login = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const toast = useContext(ToastContext)

  const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>()
  const [Loading, setLoading] = useState(false)


  const submitLogin = (data: IFormValues) => {
    setLoading(true)
    return baseUrl.post(`/api/v1/Users/Login`, data)
      .then((res) => {
        localStorage.setItem("adminToken", res.data.token)
        if (auth)
          auth.saveAdminData()
        if (toast)
          toast.getToastValue("success", "Welcome")
        setLoading(false)
        navigate('/dashboard')
      })
      .catch((err) => {
        if (toast)
          toast.getToastValue("error", err.response.data.message)
        setLoading(false)
      })
  }



  return <>
    <AuthComponent title={"Login"}>
      <form onSubmit={handleSubmit(submitLogin)}>

        <EmailInput inputName='email' {...{ errors, register }} />
        <PasswordInput inputName='password' placeholder='Enter your password' {...{ errors, register }} />

        <div className=' mt-2 d-flex justify-content-between align-content-center'>
          <Link to={'/register'} className='forget text-decoration-none text-white '>Registration ?</Link>
          <Link to={'/forgetPassword'} className='forget text-decoration-none text-white '>Forgot Password ?</Link>
        </div>
        <button type='submit' disabled={Loading} className='btn w-100 mt-4 fw-bold text-white bg-orange rounded-5 btn-lg '>{Loading ? <i className='fa fa-spin fa-spinner'></i> : "Login"}</button>

      </form>
    </AuthComponent>

  </>
}

export default Login