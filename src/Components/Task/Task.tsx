import React from 'react'
import './Task.module.scss'
import { FaEdit as Edit} from "react-icons/fa";
import { useDrag } from 'react-dnd';

interface Props {
  title:string
  id:number
  status:string
}

const Task = ({title,id,status}:Props) => {
  // console.log(title,id,status,description);
  const [{isDragging},drag]=useDrag(()=>({
    type:"div",
    item:{id,status},
    collect:(monitor)=> ({
      isDragging:!!monitor.isDragging(),
    }),
  }))
  console.log(isDragging);
  
  return <>
    <div ref={drag} className='p-3 d-flex justify-content-between bg-warning align-items-center' style={{border:isDragging?"5px solid red" :"0px" }}>
      <h3>{title}</h3>
      <Edit size={'20px'} />
    </div>
  </>
}

export default Task