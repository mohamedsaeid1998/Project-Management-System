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
      <div className="row auth  justify-content-center align-items-center ">
        <div className={`${pathname === '/register'? "col-md-10" :"col-md-6" }`}>

          <div className='text-center'>
            <img src={AuthLogo} className='Auth-Logo object-fit-cover me-2' alt="logo" />
          </div>

          <div className={`bg-overlay p-5  text-white animate__animated ${pathname === "/" ? " animate__zoomIn" : pathname === "/reset-pass" ? "animate__slideInDown" : pathname === "/register" ?  "animate__slideInDown more"  :  "animate__zoomInDown"} `}>
            <span className='fst-italic '>Welcome to PMS</span>
            <h1 className={`fw-bold orange ${pathname === '/register'? "mb-4" :"mb-5" } title position-relative `}>{title}</h1>
            {children}
          </div>

        </div>
      </div>
    </main>
  </>
}

export default AuthComponent