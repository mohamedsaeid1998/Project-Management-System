
import { IContextProps } from "@/Interfaces";
import { createContext } from "react";
import { toast } from "react-toastify";


interface ToastContextValue {
  getToastValue: (type: string, message: string) => void;
}

export const ToastContext = createContext<ToastContextValue | undefined>(undefined);




  
  const ToastContextProvider = ({ children }: IContextProps) => {
    const getToastValue = (type: string, message: string) => {
      if (type==="success" || type==="error" ) {
        toast[type](message, {
          autoClose: 2000,
          theme: "colored",
        });
      } 
    };



  return <ToastContext.Provider value={{ getToastValue }}>
    {children}
  </ToastContext.Provider>
}

export default ToastContextProvider;