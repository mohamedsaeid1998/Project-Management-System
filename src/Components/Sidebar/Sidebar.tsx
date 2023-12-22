
import { useState } from 'react';
import './SideBar.module.scss';
import { BsColumnsGap } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoIosUnlock } from "react-icons/io";
import { LiaHomeSolid } from "react-icons/lia";
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { ChangePassword } from '@/Pages';


interface Props {
  logOut:() => void
  setSidebarOpen:(a:boolean) => void
  isSidebarOpen:boolean
}


const SideBar = ({logOut,isSidebarOpen,setSidebarOpen}:Props) => {

  const [iscollapsed, setIscollapsed] = useState(false)


  const { pathname } = useLocation()
  const handleToggle = () => {
    setIscollapsed(!iscollapsed)
    setSidebarOpen(!isSidebarOpen)

  }

  const [show, setShow] = useState(false)

  const showChangePassModal = () => {
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }


  
  return <>
    <div className='sidebar-container text-white'>
    <Modal show={show} onHide={handleClose}>
      <Modal.Body><ChangePassword/></Modal.Body>
    </Modal>
      <Sidebar  collapsed={iscollapsed}  className='h-100 '>
        <Menu>
          <MenuItem data-aos="zoom-out" data-aos-delay="1000" className='my-4 logoImage'  onClick={() => handleToggle()} icon={<i className='fa fa-arrow-right'></i>} ></MenuItem>
          <MenuItem data-aos-delay="300" data-aos="fade-right"  className={`${pathname === "/dashboard" ? 'active' : null} link`} component={<Link to="/dashboard" />} icon={<LiaHomeSolid size={'25px'} />}>Home</MenuItem>
          <MenuItem data-aos-delay="400" data-aos="fade-right"  className={`${pathname === '/dashboard/users' ? 'active' : null} link`} component={<Link to='/dashboard/users' />} icon={<HiOutlineUsers size={'25px'} />}>Users</MenuItem>
          <MenuItem data-aos-delay="500" data-aos="fade-right"  className={`${pathname === '/dashboard/projects' ? 'active' : null} link`} component={<Link to='/dashboard/projects' />} icon={<BsColumnsGap size={'25px'} />}>Projects</MenuItem>
          <MenuItem data-aos-delay="700" data-aos="fade-right" className='link' onClick={showChangePassModal} icon={<IoIosUnlock size={'25px'} />}> Change Password</MenuItem>
          <MenuItem data-aos-delay="800" data-aos="fade-right" className='link' icon={<FiLogOut size={'25px'} />} onClick={() => logOut()}>LogOut</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  </>
}

export default SideBar