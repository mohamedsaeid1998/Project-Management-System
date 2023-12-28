// import { IFormValues } from "@/Interfaces";
// import baseUrl from "@/utils/Custom/Custom";
import { IContextProps } from "@/Interfaces";
import { JwtPayload, jwtDecode } from "jwt-decode";
import {  createContext, useEffect, useState } from "react";
interface AuthContextValue {
  saveAdminData?: () => void;
  adminData?:JwtPayload | null
  headers?:{}
  userRole?:string
}

export const AuthContext = createContext<AuthContextValue>({});



const AuthContextProvider = ({ children }: IContextProps) => {

  useEffect(() => {
    localStorage.getItem("adminToken") !== null ? saveAdminData() : null
  }, [])

  let headers = {
    Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
  }


  // const [Loading, setLoading] = useState(false)
  const [adminData, setAdminData] = useState<JwtPayload | null>(null)
  const [userRole, setUserRole] = useState("")


const saveAdminData = () => {
const encodedToken = localStorage.getItem("adminToken")
if (encodedToken) {
  const decodedToken = jwtDecode<JwtPayload>(encodedToken);
      // @ts-ignore
  setUserRole(decodedToken?.userGroup)
  setAdminData(decodedToken)
}
}







  return <AuthContext.Provider value={{adminData,saveAdminData,headers,userRole}}>
      {children}
    </AuthContext.Provider>
};

export default AuthContextProvider;

