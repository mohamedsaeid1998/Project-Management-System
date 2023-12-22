import './MasterLayout.module.scss'
import { Navbar, SideBar } from '..'
import { Outlet } from 'react-router-dom'
const MasterLayout = () => {
  return <>
    <div className="container-fluid d-flex ps-0 ">

<div className={`sidebar-container `}>
  <SideBar />
</div>

<div className={`container-fluid main `}>
  <Navbar />
  <Outlet />
</div>

</div>  </>
}

export default MasterLayout