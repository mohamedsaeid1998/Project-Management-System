import './Tasks.module.scss'
import { useContext, useState } from 'react'
import { FaEdit, FaTrash } from "react-icons/fa";
import UseAuthenticatedQuery from '@/utils/Hooks/UseAuthenticatedQuery';
import { AuthContext } from '@/Context/AuthContext';
import { useForm } from 'react-hook-form'
import { Modal } from 'react-bootstrap';
import { IFormValues } from '@/Interfaces';


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


  const { data:Users } = UseAuthenticatedQuery({
    queryKey: [`getUsers`],
    url: `http://upskilling-egypt.com:3003/api/v1/Users/count`,
    config: {
      headers
    }
  })

  console.log(tableData);
  console.log(Users);









  const [show, setShow] = useState(false)

  const showChangePassModal = () => {
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }


  const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>()
  const required = "This Field is required"

  return <>
      <Modal show={show} onHide={handleClose}>
      <Modal.Body>

<form className='p-3'>

              <div className=' d-flex flex-column  '>
                <label className="">Title</label>
                <input
                  className=' form-control w-100'
                  type="text"
                  placeholder='Name'

                  {...register("title", {
                    required,
                  })}
                />
            </div>

              <div className=' d-flex flex-column mt-2 '>
                <label className="">Description</label>
                <textarea
                  className=' form-control w-100'
                  placeholder='description'

                  {...register("description", {
                    required,
                  })}
                />
            </div>

<div className="row">
  <div className="col-md-6">
        {/* <select onChange={getTagValue} value={searchParams.tagId} className="form-select "  >
          <option  value={0} className="text-muted">No User Selected</option>
          {tags?.map((tag: any) =>
            <option key={tag.id} value={tag.id}>{tag.name}</option>
          )}
        </select> */}
  </div>
  <div className="col-md-6"></div>
</div>


</form>

      </Modal.Body>
    </Modal>
    <main className='bg-white mt-1'>
      <div className=' d-flex justify-content-between align-items-center p-3'>
        <h2>Tasks</h2>
        <button onClick={showChangePassModal} className='btn bg-orange text-white rounded-pill'>Add New Task</button>
      </div>

      <table className="table">
        <thead >
          <tr >
            <th className='ps-3'>Title</th>
            <th> State</th>
            <th>Users</th>
            <th>Num Tasks</th>
            <th>Date Created</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>

          {tableData?.data.map((data: any, index: number) =>

            <tr key={data?.id} >
              <td data-cell="Title" className='Title ps-3' ></td>
              <td data-cell="name "></td>
              <td data-cell="price ">{data?.price}</td>
              <td data-cell="description ">{data?.description}</td>
              <td data-cell="tag ">{data?.tag?.name}</td>
              <td data-cell="actions " className='action  align-items-center gap-3   '>

                <span className={`delete text-center`} >
                  <FaTrash size={'20px'} />
                  {/* onClick={() => showDeleteModal(data.id)}  */}
                </span>

                <span className="edit text-info pointer d-inline-block  ms-2 text-center">
                  <FaEdit size={'20px'} />

                  {/* onClick={() => showEditModal(data)} */}
                </span>


              </td>
            </tr>)}

        </tbody>

      </table>
    </main>




  </>
}

export default Tasks