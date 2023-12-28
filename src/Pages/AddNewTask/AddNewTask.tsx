import { AuthContext } from '@/Context/AuthContext';
import { ToastContext } from '@/Context/ToastContext';
import baseUrl from '@/utils/Custom/Custom';
import UseAuthenticatedQuery from '@/utils/Hooks/UseAuthenticatedQuery';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdKeyboardArrowLeft as ArrowLeft } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import './AddNewTask.module.scss';
import { ProjectContext } from '@/Context/ProjectContext';
import { LoadingIcon } from '@/Components';
import { INewTask, IProjectTasks, IUsersTasks } from '@/Interfaces/Tasks';
const AddNewTask = () => {

  const required = "This Field is required"
  const { handleSubmit, register, formState: { errors } } = useForm<INewTask>()
  const [Loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {getToastValue} = useContext(ToastContext)
  const {headers} = useContext(AuthContext)
  //!  Add New Task
  const handleAdd = (data: INewTask) => {
    
    setLoading(true)
    return baseUrl.post(`/api/v1/Task`, data ,{
      headers,
    })
      .then(() => {
        if (getToastValue)
          getToastValue("success", "Task created successfully")
        navigate('/dashboard/tasks')
      })
      .catch((err) => {
        if (getToastValue)
          getToastValue("error", err.response.data.message)
        
      }).finally(() => {
        setLoading(false)
      })
    }

    const { data:employees,isLoading } = UseAuthenticatedQuery({
      queryKey: [`getAllTasks`],
      url: `http://upskilling-egypt.com:3003/api/v1/Users/?groups=2&pageSize=100&pageNumber=1`,
      config: {
        headers
      },
      
    })

    const {handleGetData,tableData} = useContext(ProjectContext)

    useEffect(() => {
      if (handleGetData)
        handleGetData("get","",100)
    //       return () => {
    //   if (tableData) {
    //     tableData.dispose();
    //   }
    // };
    }, [])

  return <>
    <main>
      <div className='bg-white'>

        <h6 className='pt-3 ps-3'>
          <Link className='text-decoration-none text-black d-flex align-items-center ' to={'/dashboard/tasks'}>
            <ArrowLeft />
            <span>
              View All Tasks
            </span>
          </Link>
        </h6>
        <h2 className='p-3 pt-0'>Add a New Task</h2>

      </div>
      {isLoading &&<LoadingIcon /> }
      {!isLoading &&tableData?.data?.length !== 0 && <div className="row justify-content-center mt-4 mb-2">
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

<div className="d-flex justify-content-between align-items-center ">

  <div>
  <label htmlFor="employeeId" className='mt-3'>User</label>

<select {...register("employeeId", {
required,
valueAsNumber: true
})} className="form-select w-100 mt-2 mb-1 rounded-3"  >
<option className="text-muted">No Users Selected</option>
{employees?.data?.map(({id,userName}:IUsersTasks) =>
<option key={id} value={id}>{userName}</option>
)}
</select>
{errors?.employeeId ? <span className='text-danger'>{errors?.employeeId?.message}</span> : null}

  </div>

  <div>
  <label htmlFor="projectId" className='mt-3'>Project</label>

<select {...register("projectId", {
required,
valueAsNumber: true
})} className="form-select w-100 mt-2 mb-1 rounded-3">
<option className="text-muted">No Status Selected</option>
{tableData?.data?.map(({id,title}: IProjectTasks) =>
<option key={id} value={id}>{title}</option>
)}
</select>
{errors?.projectId ? <span className='text-danger'>{errors?.projectId?.message}</span> : null}

  </div>

</div>

            <div className='d-flex justify-content-between mt-3'>
              <Link to={'/dashboard/tasks'} className='btn btn-outline-dark bg-white text-black rounded-5 '>Tasks Page</Link>
              <button disabled={Loading} className={`btn AuthBtn text-white bg-orange ${Loading?"px-3":"rounded-5 "}  p-2 `}>{Loading ? <i className='fa fa-spin fa-spinner  '></i> : "Create Task"}</button>
            </div>

          </form>
        </div>
      </div>}

    </main>
  </>
}

export default AddNewTask