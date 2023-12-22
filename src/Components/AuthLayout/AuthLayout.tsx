import React from 'react'
import './AuthLayout.module.scss'
import { Outlet } from 'react-router-dom'
const AuthLayout = () => {
  return <>
    <div><Outlet/></div>
  </>
}

export default AuthLayout