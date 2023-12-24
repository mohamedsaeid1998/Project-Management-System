import { LoadingIcon } from '@/Components';
import './EditProject.module.scss'
import { AuthContext } from '@/Context/AuthContext';
import { ProjectContext } from '@/Context/ProjectContext';
import { ToastContext } from '@/Context/ToastContext';
import baseUrl from '@/utils/Custom/Custom';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate, useParams } from 'react-router-dom';


interface INewProject {
  title: string,
  description: string
}

const EditProject = () => {

  const {id} = useParams()
console.log(id);

  const required = "This Field is required"
  const { handleSubmit, register, formState: { errors } } = useForm<INewProject>()
  const [Loading, setLoading] = useState(false)
  const navigate = useNavigate()


  const data = useContext(ProjectContext)
  let handleGetData = data?.handleGetData
  let tableData = data?.tableData?.data


  useEffect(() => {
    if (handleGetData)
    handleGetData("get",id,5)
  }, [])
  console.log(tableData);



  //!  Edit Project Function
  const toast = useContext(ToastContext)
  const header = useContext(AuthContext)
  let headers = header?.header

  const handleEdit = (data: INewProject) => {
    setLoading(true)
    return baseUrl.put(`/api/v1/Project/${id}`, data ,{
      headers,
    })
      .then(() => {
        if (toast)
          toast.getToastValue("success", "Project edited successfully")
        setLoading(false)
        navigate('/dashboard/projects')
      })
      .catch((err) => {
        if (toast)
          toast.getToastValue("error", err.response.data.message)
        setLoading(false)
      })
    }



  return <>
    <main>
      <div className='bg-white'>

        <h6 className='pt-3 ps-3'>
          <Link className='text-decoration-none text-black d-flex align-items-center ' to={'/dashboard/projects'}>
            <MdKeyboardArrowLeft />
            <span>
              View All Projects
            </span>
          </Link>
        </h6>
        <h2 className='p-3 pt-0'>Edit Project</h2>

      </div>

      {tableData?.title?<><div className="row justify-content-center mt-4 mb-2">
        <div className="col-md-8 bg-white simpleModule p-4">
          <form onSubmit={handleSubmit(handleEdit)}>
            <label htmlFor="title">Title</label>
            <input {...register("title", {
              required
            })} className="form-control w-100 mt-2 py-2 rounded-4" defaultValue={tableData?.title} type="text" placeholder="Title Name" />
            {errors?.title ? <p className='text-danger mb-0 mt-1'>{errors?.title?.message}</p> : null}

            <label htmlFor="Description" className='mt-3'>Description</label>
            <textarea {...register("description", {
              required
            })} className="form-control w-100 mt-2 mb-1 py-2 rounded-4" defaultValue={tableData?.description} placeholder="Description Content" />
            {errors?.description ? <span className='text-danger mb-0 mt-1'>{errors?.description?.message}</span> : null}
            <div className='d-flex justify-content-between mt-3'>
              <Link to={'/dashboard/projects'} className='btn btn-outline-dark bg-white text-black rounded-5 '>Projects Page</Link>
              <button disabled={Loading} className='btn  text-white bg-orange rounded-5 p-2 '>{Loading ? <i className='fa fa-spin fa-spinner'></i> : "Edit Project"}</button>
            </div>

          </form>
        </div>
      </div></> :<LoadingIcon/>}

    </main>
  </>
}

export default EditProject