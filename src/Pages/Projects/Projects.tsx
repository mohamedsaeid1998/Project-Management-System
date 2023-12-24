import { NoDataImg } from '@/Assets/Images';
import { LoadingIcon } from '@/Components';
import { ProjectContext } from '@/Context/ProjectContext';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { AiOutlinePlus } from "react-icons/ai";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Projects.module.scss';

const Projects = () => {

  //! get All Projects
  const data = useContext(ProjectContext)
  let handleGetData = data?.handleGetData
  let tableData = data?.tableData?.data?.data


  useEffect(() => {
    if (handleGetData)
      handleGetData("get", "",5)
  }, [handleGetData])


  //! For Delete Module 
  const [id, setId] = useState(0)

  const [show, setShow] = useState(false)

  const showModal = (id: number) => {
    setShow(true)
    setId(id)
    console.log(id);

  }

  const handleClose = () => {
    setShow(false)
  }


  const deleteProject = () => {
    if (handleGetData)
      handleGetData("delete", id,5)
    setShow(false)
  }


  return <>

    <Modal show={show} onHide={handleClose}>
      <Modal.Body>

<div className='text-center'>
<img src={NoDataImg} alt="noData-img" />


        <h5 className='text-center'>Are You Sure You Want to Delete this Project ?</h5>

        <button onClick={deleteProject} className='btn btn-danger m-auto'>Delete Project</button>
        </div>



      </Modal.Body>
    </Modal>


    <main className='mt-1'>
      <div className=' d-flex justify-content-between align-items-center py-3 px-4 bg-white '>
        <h2>Projects</h2>
        <Link to={"/dashboard/add-project"} className='btn bg-orange p-2 text-white rounded-5 d-flex align-items-center '><AiOutlinePlus /> <span>Add New Project</span> </Link>
      </div>{tableData ? <>
        {tableData?.length > 0 ? <>
          <div className='mx-4'>
            <table className="table mt-3  ">
              <thead>
                <tr>
                  <th className='ps-3'>Id</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>CreationDate</th>
                  <th>Actions</th>

                </tr>
              </thead>
              <tbody>

                {tableData?.map((data: any, index: number) =>

                  <tr key={data?.id} >
                    <td data-cell="id" className='ps-3'>{index + 1}</td>
                    <td data-cell="title">{data?.title}</td>
                    <td data-cell="description" className='text-truncate'>{data?.description}</td>
                    <td data-cell="creationDate ">{moment(data?.creationDate).format("Do MMM YY")}</td>

                    <td data-cell="actions" className='action align-items-center gap-3 '>

                      <span className={`delete text-center text-danger`} >
                        <FaTrash size={'20px'} onClick={() => showModal(data.id)} />

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

export default Projects



