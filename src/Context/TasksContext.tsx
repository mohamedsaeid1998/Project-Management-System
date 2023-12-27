
import { IContextProps } from "@/Interfaces";
import baseUrl from "@/utils/Custom/Custom";
import { createContext, useContext, useState } from "react";
import { ToastContext } from "./ToastContext";

interface TasksContextTypes {
  GetTaskData?: (type: "get" | "delete", id: number | string, itemsNumber: number) => any
  taskData?: any
}

export const TasksContext = createContext<TasksContextTypes>({});



const TasksContextProvider = ({ children }: IContextProps) => {

  const { getToastValue } = useContext(ToastContext)
  let headers = {
    Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
  }

  const [taskData, setTaskData] = useState(null)

  const GetTaskData = (type: "get" | "delete" = "get", id: number | string, itemsNumber: number = 5) => {

    if (type === "get" || type === "delete") {
      return baseUrl[type](`/api/v1/Task/${id}`, {
        headers,
        params: {
          pageSize: itemsNumber,
          pageNumber: 1,
        }
      })
        .then((data) => {
          if (type === "delete") {
            if (getToastValue)
              getToastValue("success", "Task Deleted successfully")
          }

          //@ts-ignore
          setTaskData(data?.data)
        })
        .catch((err) => {
          if (type === "delete") {
            if (getToastValue)
              getToastValue("error", err.response.data.message)
          }
        })
    }
  }


  return <TasksContext.Provider value={{ GetTaskData, taskData }}>
    {children}
  </TasksContext.Provider>
};

export default TasksContextProvider;