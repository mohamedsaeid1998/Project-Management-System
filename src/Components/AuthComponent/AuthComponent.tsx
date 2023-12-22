import React from 'react'
import './AuthComponent.module.scss'
import { useLocation } from 'react-router-dom'
import { AuthLogo } from '@/Assets/Images'

interface Props {
  children: React.ReactNode
  title: string
}


const AuthComponent = ({ children, title }: Props) => {
  const { pathname } = useLocation()
  return <>
    <main className={`${pathname === '/' || pathname === '/login' ? "AuthLogin" : pathname === "/forgetPassword" ? "AuthForget" : pathname === "/resetPassword" ? "AuthReset" : "AuthChange"} Auth-container container-fluid`}>
      <div className="row vh-100 justify-content-center align-items-center ">
        <div className="col-md-6">

          <div className='text-center'>
            <img src={AuthLogo} className='Auth-Logo object-fit-cover me-2' alt="logo" />
          </div>

          <div className={`bg-overlay text-white p-5 animate__animated ${pathname === "/" ? " animate__zoomIn" : pathname === "/reset-pass" ? "animate__slideInDown" : "animate__zoomInDown"} `}>
            <span className='fst-italic '>Welcome to PMS</span>
            <h1 className={'fw-bold orange mb-5 title position-relative'}>{title}</h1>
            {children}
          </div>

        </div>
      </div>
    </main>
  </>
}

export default AuthComponent