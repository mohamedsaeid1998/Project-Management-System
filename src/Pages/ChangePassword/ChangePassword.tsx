import { IFormValues } from '@/Interfaces'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import baseUrl from '@/utils/Custom/Custom'
import { useContext, useState } from 'react'

import { AuthLogo } from '@/Assets/Images'
import { ConfirmPassInput, PasswordInput } from '@/Components'
import { AuthContext } from '@/Context/AuthContext'
import { ToastContext } from '@/Context/ToastContext'
import './ChangePassword.module.scss'





const ChangePassword = () => {

  const [Loading, setLoading] = useState(false)
  const {headers} = useContext(AuthContext)
  const navigate = useNavigate()
  const { getToastValue } = useContext(ToastContext)
  const { register, getValues, handleSubmit, formState: { errors } } = useForm<IFormValues>()



  const onSubmit = (data: IFormValues) => {
    setLoading(true)
    return baseUrl.put(`/api/v1/Users/ChangePassword`, data, {
      headers
    })
      .then(() => {
        if (getToastValue)
          getToastValue("success", "Project created successfully")
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

      <main className="Auth-container bg-overlay">
      <div className="row justify-content-center align-items-center ">
        <div className="col-md-12">
          <div className=" p-5 object-fit-cover">

            <div className="logo text-center">
              <img src={AuthLogo} className='w-50' alt="logo" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className='fw-bold orange title position-relative'>Change Password</h2>

              <PasswordInput {...{register,errors}}  inputName={'oldPassword'} placeholder='Old Password' />

              <PasswordInput {...{register,errors}} inputName={'newPassword'} placeholder='New Password'  />

              <ConfirmPassInput {...{register,errors,getValues}} inputName={'confirmNewPassword'} placeholder='Confirm New Password' />

              <button type='submit' disabled={Loading} className='btn AuthBtn w-100 mt-4 fw-bold text-white bg-orange rounded-5 btn-lg '>{Loading ? <i className='fa fa-spin fa-spinner'></i> : "ChangePassword"}</button>
            </form>
          </div>
        </div>
      </div>
    </main>

  </>
}

export default ChangePassword