import { NoDataImg } from '@/Assets/Images';
import { LoadingIcon } from '@/Components';
import { AuthContext } from '@/Context/AuthContext';
import { ProjectContext } from '@/Context/ProjectContext';
import baseUrl from '@/utils/Custom/Custom';
import moment from 'moment';
import { ReactEventHandler, useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { AiOutlinePlus as PlusIcon } from "react-icons/ai";
import { FaEdit as Edit, FaTrash as Trash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Projects.module.scss';

const Projects = () => {

  //! get All Projects

  const { headers, userRole } = useContext(AuthContext)
  const { handleGetData } = useContext(ProjectContext)


console.log(userRole);
const [tableData, setTableData] = useState(null)
const [isLoading, setIsLoading] = useState(false)

const getProjectsData = (pageNum:any,title:string) => {
  setIsLoading(true)

    return baseUrl.get(`/api/v1/Project/${userRole==="Employee"?"employee":"manager"}`, {
      headers,
      params: {
        pageSize: 5,
        pageNumber: pageNum,
        title
      }
    })
      .then((res:any) => {
        console.log(res?.data)
        setTableData(res?.data)
      })
      .catch((err) => {
console.log(err);


      }).finally(()=>{
        setIsLoading(false)
      })

}

const pagination = (pageNum:number,searchParams:string) => { 
  getProjectsData(pageNum,searchParams)
}

const [searchParams, setSearchParams] = useState()

const searching = (e:any) => { 
  getProjectsData(1,e.target.value)
  setSearchParams(e.target.value)
}


  console.log(tableData);
  useEffect(() => {
    if(userRole){
      getProjectsData(1,"")

    }

  }, [userRole])


  //! For Delete Module 
  const [id, setId] = useState(0)

  const [show, setShow] = useState(false)

  const showModal = (id: number) => {
    setShow(true)
    setId(id)

  }

  const handleClose = () => {
    setShow(false)
  }



  const deleteProject = () => {
    if (handleGetData)
      handleGetData("delete", id, 5)
    setShow(false)
    getProjectsData(1,"")
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
        {userRole === "Manager" ? <Link to={"/dashboard/add-project"} className='btn AuthBtn navigate bg-orange p-2 text-white rounded-5 d-flex align-items-center '><PlusIcon size={13} /> <span className='ms-1'>Add New Project</span> </Link> : ""}
      </div>


      <div className='mx-4 mt-3 bg-white'>
        <div className='mt-3 p-3'>
          <input onChange={searching} type="search" className='form-control w-25 ' placeholder={`Search by Title ...`} />
        </div>

        {isLoading && <LoadingIcon />}
        {!isLoading && tableData?.data?.length == 0 && <div className='text-center mt-3 '>
          <img src={NoDataImg} alt="noData-img" />
          <h3 className='pt-1 mb-0'> No Data !</h3>
        </div>}
        {!isLoading && tableData?.data?.length > 0 &&
          <table className="table mt-3  ">
            <thead>
              <tr>
                <th className='ps-3'>Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>CreationDate</th>
                {userRole === "Manager" ? <th>Actions</th> : ""}
              </tr>
            </thead>
            <tbody>

              {tableData?.data?.map((data: any, index: number) =>

                <tr key={data?.id} >
                  <td data-cell="id" className='ps-3'>{index + 1}</td>
                  <td data-cell="title">{data?.title}</td>
                  <td data-cell="description" className='text-truncate'>{data?.description}</td>
                  <td data-cell="creationDate ">{moment(data?.creationDate).format("Do MMM YY")}</td>



                  {userRole === "Manager" ? <>
                    <td data-cell="actions" className='action align-items-center gap-3 '>
                      <button className={`delete text-center text-danger pointer`} onClick={() => showModal(data.id)} >
                        <Trash size={'20px'} />
                      </button>

                      <Link to={`/dashboard/edit-project/${data?.id}`} className="edit text-info pointer d-inline-block  ms-3 me-2 text-center">
                        <Edit size={'20px'} />
                      </Link>

                    </td>
                  </> : ""}




                </tr>)}

            </tbody>

          </table>
        }
                <nav className='page' aria-label="Page navigation example ">
          <ul className="pagination m-auto mb-4">
            {Array(tableData?.totalNumberOfPages).fill(0).map((_, i) => i + 1).map((pageNo) =>
              <li  onClick={()=>pagination(pageNo,searchParams)} key={pageNo} className='page-item'>
                <a className={`page-link ${pageNo ?"activePage": ""}`}>
                  {pageNo}
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>


    </main>
  </>
}

export default Projects



