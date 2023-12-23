import './MasterLayout.module.scss'
import { Navbar, SideBar } from '..'
import { Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
const MasterLayout = () => {

  const navigate = useNavigate()

  const logOut = () => {
      localStorage.removeItem('adminToken')
      navigate('/')
    }

    const [isSidebarOpen, setSidebarOpen] = useState(true);


  return <>


    <div className="container-fluid d-flex ps-0 pe-0 ">

<div className={`sidebar-container `}>
  <SideBar {...{ logOut ,setSidebarOpen ,isSidebarOpen}} />
</div>
<div className={`container-fluid main ${isSidebarOpen ? 'main-sidebar-open' : 'main-sidebar-closed'} `}>
<Navbar {...{logOut}}/>
  <Outlet />
</div>

</div>  </>
}

export default MasterLayout