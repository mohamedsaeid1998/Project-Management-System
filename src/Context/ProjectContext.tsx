
import { IContextProps } from "@/Interfaces";
import baseUrl from "@/utils/Custom/Custom";
import { createContext, useContext, useState } from "react";
import { ToastContext } from "./ToastContext";


interface ProjectContextTypes {
  handleGetData: (type: string, id: any,pages:number) => any
  tableData: any

}

export const ProjectContext = createContext<ProjectContextTypes | null>(null);



const ProjectContextProvider = ({ children }: IContextProps) => {

  const toast = useContext(ToastContext)
  let headers = {
    Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
  }

  const [tableData, setTableData] = useState(null)

  // const [Loading, setLoading] = useState(false)
  const handleGetData = (type: string, id: any,pages:number) => {

    if (type === "get" || type === "delete") {
      return baseUrl[type](`/api/v1/Project/${id}`,{
        headers,
        params:{
          pageSize:pages,
          pageNumber:1,
        }
      })
        .then((data) => {
          if (type === "delete") {
            if (toast)
              toast.getToastValue("success", "Project Deleted successfully")

          }

          //@ts-ignore
          setTableData(data)
        })
        .catch((err) => {
          console.log(err.response.data.message);
          if (type === "delete") {
            if (toast)
              toast.getToastValue("error", err.response.data.message)

          }
        })
    }
  }


  return <ProjectContext.Provider value={{ handleGetData, tableData }}>
    {children}
  </ProjectContext.Provider>
};

export default ProjectContextProvider;