
import { ChangePassword } from '@/Pages';
import { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaProjectDiagram as ProjectDiagram , FaTasks as Tasks } from "react-icons/fa";
import { FiLogOut as LogOut } from "react-icons/fi";
import { HiOutlineUsers as Users} from "react-icons/hi2";
import { IoIosUnlock as Unlock} from "react-icons/io";
import { LiaHomeSolid as Home } from "react-icons/lia";
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import './SideBar.module.scss';
import { AuthContext } from '@/Context/AuthContext';


interface Props {
  logOut:() => void
  setSidebarOpen:(a:boolean) => void
  isSidebarOpen:boolean
}


const SideBar = ({logOut,isSidebarOpen,setSidebarOpen}:Props) => {

const {userRole} =  useContext(AuthContext)

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
      <Sidebar collapsed={iscollapsed}  className='h-100 '>
        <Menu>
          <MenuItem data-aos="zoom-out" data-aos-delay="1000" className='my-4 logoImage'  onClick={() => handleToggle()} icon={<i className='fa fa-arrow-right'></i>} ></MenuItem>
          <MenuItem data-aos-delay="300" data-aos="fade-right"  className={`${pathname === "/dashboard" ? 'active' : null} link`} component={<Link to="/dashboard" />} icon={<Home size={'25px'} />}>Home</MenuItem>
          {userRole === "Manager"?<MenuItem data-aos-delay="400" data-aos="fade-right"  className={`${pathname === '/dashboard/users' ? 'active' : null} link`} component={<Link to='/dashboard/users' />} icon={<Users size={'25px'} />}>Users</MenuItem>:null}
          <MenuItem data-aos-delay="500" data-aos="fade-right"  className={`${pathname === "/dashboard/projects" ||pathname === "/dashboard/add-project" || pathname.includes("edit-project") ? 'active' : null} link`} component={<Link to='/dashboard/projects' />} icon={<ProjectDiagram size={'25px'} />}>Projects</MenuItem>
          <MenuItem data-aos-delay="600" data-aos="fade-right"  className={`${pathname === "/dashboard/tasks" ||pathname === "/dashboard/add-task" || pathname.includes("edit-task") ? 'active' : null} link`} component={<Link to='/dashboard/tasks' />} icon={<Tasks size={'25px'} />}>Tasks</MenuItem>
          <MenuItem data-aos-delay="700" data-aos="fade-right" className='link' onClick={showChangePassModal} icon={<Unlock size={'25px'} />}> Change Password</MenuItem>
          <MenuItem data-aos-delay="800" data-aos="fade-right" className='link' icon={<LogOut size={'25px'} />} onClick={() => logOut()}>LogOut</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  </>
}

export default SideBar