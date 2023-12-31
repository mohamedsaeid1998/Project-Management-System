import { AuthContext } from '@/Context/AuthContext';
import { ToastContext } from '@/Context/ToastContext';
import baseUrl from '@/utils/Custom/Custom';
import { useContext } from 'react';
import { useDrop } from 'react-dnd';
import { Task } from '..';
import './Done.module.scss';
import { IEmpTasks } from '@/Interfaces/EmployeeTasks';


const Done = ({ AllTasks,getTasksData }: IEmpTasks) => {
  const { headers } = useContext(AuthContext)
  const { getToastValue } = useContext(ToastContext)



  const throwElement = (id: number, status: string) => {

    if (status === "Done") {
      return null
    }

    return baseUrl.put(`/api/v1/Task/${id}/change-status`, {
      status: "Done"
    }, {
      headers,
    })
      .then(() => {
        if (getToastValue)
          getToastValue("success", "Changed To Done State Successfully")
          getTasksData()
      })
      .catch((err) => {
        if (getToastValue)
          getToastValue("error", err.response.data.message)
      })

  }



  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item: any) => {
      throwElement(item.id, item.status);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),

  }))

  const isActive = canDrop && isOver;
  let backgroundColor = "rgba(49, 89, 81, 0.90)";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }


  return <>
    <div className='TasksContainer p-3 d-flex flex-column gap-3' ref={drop}  style={{ backgroundColor }}>
      {AllTasks.map(({ title, id, status }: any) => <Task key={id}  {...{ title, id, status }} />)}
    </div>

  </>
}

export default Done