
import { IContextProps } from "@/Interfaces";
import baseUrl from "@/utils/Custom/Custom";
import { createContext, useContext, useState } from "react";
import { ToastContext } from "./ToastContext";

interface ProjectContextTypes {

  handleGetData?: (type: "get" | "delete", id: number|string, itemsNumber: number) => any
  tableData?: any
}

export const ProjectContext = createContext<ProjectContextTypes>({});



const ProjectContextProvider = ({ children }: IContextProps) => {

  const { getToastValue } = useContext(ToastContext)
  let headers = {
    Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
  }

  const [tableData, setTableData] = useState(null)

  // const [Loading, setLoading] = useState(false)


  const handleGetData = (type: "get" | "delete" = "get", id: number|string, itemsNumber: number = 5) => {

    if (type === "get" || type === "delete") {
      return baseUrl[type](`/api/v1/Project/${id}`, {
        headers,
        params: {
          pageSize: itemsNumber,
          pageNumber: 1,
        }
      })
        .then((data) => {
          if (type === "delete") {
            if (getToastValue)
              getToastValue("success", "Project Deleted successfully")
          }

          //@ts-ignore
          setTableData(data?.data)          
        })
        .catch((err) => {
          if (type === "delete") {
            if (getToastValue)
              getToastValue("error", err.response.data.message)

          }
        })
    }
  }


  return <ProjectContext.Provider value={{ handleGetData, tableData }}>
    {children}
  </ProjectContext.Provider>
};

export default ProjectContextProvider;