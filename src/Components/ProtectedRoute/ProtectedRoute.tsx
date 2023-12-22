
import './ProtectedRoute.module.scss'
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children:ReactNode
}

const ProtectedRoute = ({children}:Props) => {
if (localStorage.getItem('adminToken') ){
return children
}else{
return <Navigate to={'/'}/>
}
}

export default ProtectedRoute