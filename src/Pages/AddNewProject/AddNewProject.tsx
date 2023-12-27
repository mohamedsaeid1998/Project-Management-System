import { AuthContext } from '@/Context/AuthContext';
import { ToastContext } from '@/Context/ToastContext';
import baseUrl from '@/utils/Custom/Custom';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdKeyboardArrowLeft as ArrowLeft } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import './AddNewProject.module.scss';
import { INewProject } from '@/Interfaces/Projects';


const AddNewProject = () => {

  const required = "This Field is required"
  const { handleSubmit, register, formState: { errors } } = useForm<INewProject>()
  const [Loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { getToastValue } = useContext(ToastContext)
  const { headers } = useContext(AuthContext)

  //!  Add New Projects
  const handleAdd = (data: INewProject) => {
    setLoading(true)
    return baseUrl.post(`/api/v1/Project`, data, {
      headers,
    })
      .then(() => {
        if (getToastValue)
          getToastValue("success", "Project created successfully")
        navigate('/dashboard/projects')
      })
      .catch((err) => {
        if (getToastValue)
          getToastValue("error", err.response.data.message)
      }).finally(() => {
        setLoading(false)
      })
  }



  return <>
    <main>
      <div className='bg-white'>

        <h6 className='pt-3 ps-3'>
          <Link className='text-decoration-none text-black d-flex align-items-center ' to={'/dashboard/projects'}>
            <ArrowLeft />
            <span>
              View All Projects
            </span>
          </Link>
        </h6>
        <h2 className='p-3 pt-0'>Add a New Project</h2>

      </div>

      <div className="row justify-content-center mt-4 mb-2">
        <div className="col-md-8 bg-white simpleModule p-4">
          <form onSubmit={handleSubmit(handleAdd)}>
            <label htmlFor="title">Title</label>
            <input {...register("title", {
              required
            })} className="form-control w-100 mt-2 py-2 rounded-4" type="text" placeholder="Title Name" />
            {errors?.title ? <p className='text-danger mb-0 mt-1'>{errors?.title?.message}</p> : null}

            <label htmlFor="Description" className='mt-3'>Description</label>
            <textarea {...register("description", {
              required
            })} className="form-control w-100 mt-2 mb-1 py-2 rounded-4" placeholder="Description Content" />
            {errors?.description ? <span className='text-danger mb-0 mt-1'>{errors?.description?.message}</span> : null}
            <div className='d-flex justify-content-between mt-3'>
              <Link to={'/dashboard/projects'} className='btn btn-outline-dark bg-white text-black rounded-5 '>Projects Page</Link>
              <button disabled={Loading} className={`btn AuthBtn text-white bg-orange ${Loading?"px-3":"rounded-5 "} p-2 `}>{Loading ? <i className='fa fa-spin fa-spinner'></i> : "Create Project"}</button>
            </div>

          </form>
        </div>
      </div>

    </main>
  </>
}

export default AddNewProject