import './Tasks.module.scss'
import { useContext, useState } from 'react'
import { FaEdit, FaTrash } from "react-icons/fa";
import UseAuthenticatedQuery from '@/utils/Hooks/UseAuthenticatedQuery';
import { AuthContext } from '@/Context/AuthContext';
import { useForm } from 'react-hook-form'
import { Modal } from 'react-bootstrap';
import { IFormValues } from '@/Interfaces';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import moment from 'moment';
import { NoDataImg } from '@/Assets/Images';
import { LoadingIcon } from '@/Components';


const Tasks = () => {
  const auth = useContext(AuthContext)
  let headers = auth?.header
  
  const { data:tableData } = UseAuthenticatedQuery({
    queryKey: [`getAllTasks`],
    url: `http://upskilling-egypt.com:3003/api/v1/Task/manager`,
    config: {
      headers
    }
  })

  console.log(tableData);


  // const { data:Users } = UseAuthenticatedQuery({
  //   queryKey: [`getUsers`],
  //   url: `http://upskilling-egypt.com:3003/api/v1/Users/count`,
  //   config: {
  //     headers
  //   }
  // })

  console.log(tableData?.data);









  const [show, setShow] = useState(false)

  const showModal = () => {
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }


  const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>()
  const required = "This Field is required"




  return <>


    <main className='bg-white mt-1'>
    <div className=' d-flex justify-content-between align-items-center py-3 px-4 bg-white '>
        <h2>Tasks</h2>
        <Link to={"/dashboard/add-task"} className='btn bg-orange p-2 text-white rounded-5 d-flex align-items-center '><AiOutlinePlus /> <span>Add New Task</span> </Link>
      </div>{tableData ? <>
        {tableData?.data.length > 0 ? <>
          <div className='mx-4'>
            <table className="table mt-3  ">
              <thead>
                <tr>
                  <th className='ps-3'>Id</th>
                  <th>Title</th>
                  <th>User</th>
                  <th>Project</th>
                  <th>Description</th>
                  
                  <th>Date Created</th>
                  <th>Actions</th>

                </tr>
              </thead>
              <tbody>

                {tableData?.data.map((data: any, index: number) =>

                  <tr key={data?.id} >
                    <td data-cell="id" className='ps-3'>{index + 1}</td>
                    <td data-cell="title">{data?.title}</td>
                    <td data-cell="User">{data?.employee.userName}</td>
                    <td data-cell="project">{data?.project.title}</td>
                    <td data-cell="description" className='text-truncate'>{data?.description}</td>
                    <td data-cell="creationDate ">{moment(data?.creationDate).format("Do MMM YY")}</td>
                    <td data-cell="actions" className='action align-items-center gap-3 '>

                      <span className={`delete text-center text-danger`} >
                        {/* <FaTrash size={'20px'} onClick={() => showModal(data.id)} /> */}

                      </span>

                      <Link to={`/dashboard/edit-project/${data?.id}`} className="edit text-info pointer d-inline-block  ms-3 me-2 text-center">
                        <FaEdit size={'20px'} />
                      </Link>



                    </td>
                  </tr>)}

              </tbody>

            </table>
          </div>
        </> : <div className='text-center mt-3 '>
          <img src={NoDataImg} alt="noData-img" />
          <h3 className='pt-1 mb-0'> No Data !</h3>

        </div>
        }
      </> : <LoadingIcon />}
    </main>




  </>
}

export default Tasks