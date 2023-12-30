import { NoDataImg } from '@/Assets/Images';
import { Done, InProgress, LoadingIcon, Todo } from '@/Components';
import { AuthContext } from '@/Context/AuthContext';
import { TasksContext } from '@/Context/TasksContext';
import baseUrl from '@/utils/Custom/Custom';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { AiOutlinePlus as PlusIcon } from 'react-icons/ai';
import { FaEdit as Edit, FaTrash as Trash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './Tasks.module.scss';
import UseAuthenticatedQuery from '@/utils/Hooks/UseAuthenticatedQuery';



const Tasks = () => {

  const { headers, userRole } = useContext(AuthContext)


  const { data: tableData, isLoading ,refetch} = userRole === "Manager" ? UseAuthenticatedQuery({
    queryKey: [`getAllTasks`],
    url: `http://upskilling-egypt.com:3003/api/v1/Task/manager`,
    config: {
      headers,
    },
  }) : { data: null, isLoading: false ,refetch:null };


  
  
  const [Loading, setLoading] = useState(false)

  //! For Delete Module 
  const { GetTaskData } = useContext(TasksContext)
  const [id, setId] = useState(0)

  const [show, setShow] = useState(false)

  const showModal = (id: number) => {
    setShow(true)
    setId(id)
  }

  const handleClose = () => {
    setShow(false)
  }

  const deleteTask = () => {
    if (GetTaskData) {
      setLoading(true)
      GetTaskData("delete", id, 5)
    }

    setLoading(false)
    if(refetch)
    refetch()
    setShow(false)
  }




  const [AllTasks, setAllTasks] = useState({
    todo: [],
    inProgress: [],
    done: []
  })
  // console.log(AllTasks);

  const getTasksData = () => {
    return baseUrl.get(`/api/v1/Task?pageSize=1000&pageNumber=1`, {
      headers,
    })
      .then((res) => {
        console.log(res.data.data);
        setAllTasks({
          todo: res?.data?.data?.filter((task: any) => task.status === "ToDo"),
          inProgress: res?.data?.data?.filter((task: any) => task.status === "InProgress"),
          done: res?.data?.data?.filter((task: any) => task.status === "Done")
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }


  useEffect(() => {
if(userRole==="Employee")
    getTasksData()
  }, [userRole])



  return <>


    <Modal show={show} onHide={handleClose}>
      <Modal.Body>

        <div className='text-center'>
          <img src={NoDataImg} alt="noData-img" />

          <h5 className='text-center'>Are You Sure You Want to Delete this Task ?</h5>

          <button disabled={Loading} onClick={deleteTask} className='btn btn-danger m-auto'>{Loading ? <i className='fa fa-spin fa-spinner'></i> : "Delete Task"}</button>
        </div>

      </Modal.Body>
    </Modal>

    <main className=' mt-1'>

      <div className=' d-flex justify-content-between align-items-center py-3 px-4 bg-white '>
        <h2>{userRole === "Manager" ? "Tasks" : "Task Board"}</h2>
        {userRole === "Manager" ? <Link to={"/dashboard/add-task"} className='btn AuthBtn navigate bg-orange p-2 text-white rounded-5 d-flex align-items-center '><PlusIcon size={13} /> <span className='ms-1'> Add New Task</span></Link> : null}
      </div>
      {userRole === "Manager" ? <>
        {isLoading && <LoadingIcon />}
        {!isLoading && tableData?.data?.length == 0 && <div className='text-center mt-3 '>
          <img src={NoDataImg} alt="noData-img" />
          <h3 className='pt-1 mb-0'> No Data !</h3>

        </div>}
        {!isLoading && tableData?.data?.length > 0 &&
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

                {tableData?.data?.map((data: any, index: number) =>

                  <tr key={data?.id} >
                    <td data-cell="id" className='ps-3'>{index + 1}</td>
                    <td data-cell="title">{data?.title}</td>
                    <td data-cell="User">{data?.employee?.userName}</td>
                    <td data-cell="project">{data?.project?.title}</td>
                    <td data-cell="description" className='text-truncate'>{data?.description}</td>
                    <td data-cell="creationDate ">{moment(data?.creationDate).format("Do MMM YY")}</td>
                    <td data-cell="actions" className='action align-items-center gap-3 '>

                      <button className={`btn delete text-center text-danger pointer`} onClick={() => showModal(data?.id)} >
                        <Trash size={'20px'} />
                      </button>

                      <Link to={`/dashboard/edit-task/${data?.id}`} className="edit text-info pointer d-inline-block  ms-3 me-2 text-center">
                        <Edit size={'20px'} />
                      </Link>

                    </td>
                  </tr>)}

              </tbody>

            </table>

          </div>
        }
      </> : <>
        {AllTasks.todo.length ==0 && <LoadingIcon />}
        {AllTasks.todo.length>0 && 
        <div className="row p-3">
          <div className="col-md-4 mt-4">
          <h2 className=''>To Do</h2>
              <Todo AllTasks={AllTasks?.todo} getTasksData={getTasksData} />
          </div>


          <div className="col-md-4 mt-4 " >
            <h2 className=''>InProgress</h2>
            <InProgress AllTasks={AllTasks?.inProgress} getTasksData={getTasksData} />
          </div>

          <div className="col-md-4 mt-4">
            <h2 className=''>Done</h2>
            <Done AllTasks={AllTasks?.done} getTasksData={getTasksData}/>
          </div>


        </div>}

      </>}

    </main>




  </>
}

export default Tasks