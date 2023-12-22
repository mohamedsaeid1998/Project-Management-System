// import { IFormValues } from "@/Interfaces";
// import baseUrl from "@/utils/Custom/Custom";
import { IContextProps } from "@/Interfaces";
import { JwtPayload, jwtDecode } from "jwt-decode";
import {  createContext, useEffect, useState } from "react";
interface AuthContextValue {
  saveAdminData: () => void;
  Loading:boolean
  adminData:JwtPayload | null
}

export const AuthContext = createContext<AuthContextValue|null>(null);



const AuthContextProvider = ({ children }: IContextProps) => {

  useEffect(() => {
    localStorage.getItem("adminToken") !== null ? saveAdminData() : null
  }, [])


  const [Loading, setLoading] = useState(false)
  const [adminData, setAdminData] = useState<JwtPayload | null>(null)


const saveAdminData = () => {
const encodedToken = localStorage.getItem("adminToken")
if (encodedToken) {
  const decodedToken = jwtDecode<JwtPayload>(encodedToken);
  setAdminData(decodedToken)
}
}







  return <AuthContext.Provider value={{Loading,adminData,saveAdminData}}>
      {children}
    </AuthContext.Provider>
};

export default AuthContextProvider;

