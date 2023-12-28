import React from 'react'
import './Navbar.module.scss'
import UseAuthenticatedQuery from '@/utils/Hooks/UseAuthenticatedQuery'
import {  NavLogo } from '@/Assets/Images'


interface Props {
  logOut: () => void
}

const Navbar = ({ logOut }: Props) => {



  const { data } = UseAuthenticatedQuery({
    queryKey: [`getUserDetails`],
    url: `http://upskilling-egypt.com:3003/api/v1/Users/currentUser`,
    config: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      }
    }
  })

  return <>
    <nav className="navbar navbar-expand-lg bg-white  ">
      <div className="container-fluid">
        <img src={NavLogo} alt="Logo" width="200" height="55" className="d-inline-block align-text-top me-2 " />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse navStyle  " id="navbarSupportedContent">
          <ul className="navbar-nav  mb-2 mb-lg-0 ">

            <li data-aos="fade-left" data-aos-delay="400" className="nav-item dropdown">

              <a className="nav-link dropdown-toggle d-flex align-items-center" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img className='navImage me-3' src={ `http://upskilling-egypt.com:3003/` + data?.imagePath  } alt="NavAvatar" />
                <div className='d-flex flex-column'>
                  <span className='capitalize'>{data?.userName }</span>
                  <span className='navEmail small'>{data?.email}</span>
                </div>

              </a>
              {/* <ul className="dropdown-menu">
                <li><a className="dropdown-item pointer" onClick={logOut}>LogOut</a></li>
              </ul> */}
            </li>
          </ul>

        </div>
      </div>
    </nav>
  </>
}

export default Navbar