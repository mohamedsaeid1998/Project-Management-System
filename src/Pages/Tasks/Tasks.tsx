import { NoDataImg } from '@/Assets/Images';
import { LoadingIcon } from '@/Components';
import { AuthContext } from '@/Context/AuthContext';
import { TasksContext } from '@/Context/TasksContext';
import UseAuthenticatedQuery from '@/utils/Hooks/UseAuthenticatedQuery';
import moment from 'moment';
import { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { AiOutlinePlus as PlusIcon } from 'react-icons/ai';
import { FaEdit as Edit, FaTrash as Trash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './Tasks.module.scss';


const Tasks = () => {
  const { headers } = useContext(AuthContext)

  const { data: tableData, refetch ,isLoading} = UseAuthenticatedQuery({
    queryKey: [`getAllTasks`],
    url: `http://upskilling-egypt.com:3003/api/v1/Task/manager`,
    config: {
      headers
    }
  })
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
    refetch()
    setShow(false)
  }

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
        <h2>Tasks</h2>
        <Link to={"/dashboard/add-task"} className='btn AuthBtn navigate bg-orange p-2 text-white rounded-5 d-flex align-items-center '><PlusIcon size={13} /> <span className='ms-1'> Add New Task</span></Link>
      </div>
      {isLoading &&<LoadingIcon /> }
      {!isLoading && tableData?.data?.length==0 && <div className='text-center mt-3 '>
          <img src={NoDataImg} alt="noData-img" />
          <h3 className='pt-1 mb-0'> No Data !</h3>

        </div>}
        {!isLoading &&tableData?.data?.length > 0 &&
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

                      <span className={`delete text-center text-danger pointer`} >
                        <Trash size={'20px'} onClick={() => showModal(data?.id)} />

                      </span>

                      <Link to={`/dashboard/edit-task/${data?.id}`} className="edit text-info pointer d-inline-block  ms-3 me-2 text-center">
                        <Edit size={'20px'} />
                      </Link>

                    </td>
                  </tr>)}

              </tbody>

            </table>

</div>
        }
    </main>




  </>
}

export default Tasks