import { AuthComponent, EmailInput, PasswordInput } from '@/Components'
import { AuthContext } from '@/Context/AuthContext'
import { ToastContext } from '@/Context/ToastContext'
import { IFormValues } from '@/Interfaces'
import baseUrl from '@/utils/Custom/Custom'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, } from 'react-router-dom'
import './Login.module.scss'


const Login = () => {
  const navigate = useNavigate()
  const {saveAdminData} = useContext(AuthContext)
  const {getToastValue} = useContext(ToastContext)

  const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>()
  const [Loading, setLoading] = useState(false)


  const submitLogin = (data: IFormValues) => {
    setLoading(true)
    return baseUrl.post(`/api/v1/Users/Login`, data)
      .then((res) => {
        localStorage.setItem("adminToken", res.data.token)
        if (saveAdminData)
          saveAdminData()
        if (getToastValue)
          getToastValue("success", "Welcome")
        navigate('/dashboard')
      })
      .catch((err) => {
        if (getToastValue)
          getToastValue("error", err.response.data.message)
      }).finally(() => {
        setLoading(false)
      })
  }


  return <>
    <AuthComponent title={"Login"} {...{ errors }}>

      <form onSubmit={handleSubmit(submitLogin)} className=''>




      {/* { errors?.email ? <div className="error-badge m-auto  ">
        <span className=' small my-2'>{errors?.email?.message}</span>
      </div> : null} */}




        <EmailInput inputName='email' {...{ errors, register }} />

        <PasswordInput inputName='password' placeholder='Enter your password' {...{ errors, register }} />

        <div className=' mt-3 d-flex justify-content-between align-content-center'>
          <Link to={'/register'} className='forget text-decoration-none orange '>Registration ?</Link>
          <Link to={'/forgetPassword'} className='forget text-decoration-none orange '>Forgot Password ?</Link>
        </div>
        <button type='submit' disabled={Loading} className='btn AuthBtn w-100 mt-4 fw-bold text-white bg-orange rounded-5 btn-lg '>{Loading ? <i className='fa fa-spin fa-spinner'></i> : "Login"}</button>

      </form>
    </AuthComponent>

  </>
}

export default Login