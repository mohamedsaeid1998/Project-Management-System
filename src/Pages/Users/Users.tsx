import { useContext } from 'react';
import { AuthContext } from '@/Context/AuthContext';
import UseAuthenticatedQuery from '@/utils/Hooks/UseAuthenticatedQuery';
import { NoDataImg } from '@/Assets/Images';
import { LoadingIcon } from '@/Components';
import { ToastContext } from '@/Context/ToastContext';
import baseUrl from '@/utils/Custom/Custom';
import moment from 'moment';
import './Users.module.scss';
const Users = () => {

  const {headers} = useContext(AuthContext)

  
  const { data:tableData,refetch } = UseAuthenticatedQuery({
    queryKey: [`getAllTasks`],
    url: `http://upskilling-egypt.com:3003/api/v1/Users`,
    config: {
      headers
    }
  })



  // const [Loading, setLoading] = useState(false)
  const {getToastValue} = useContext(ToastContext)

  const onSubmitBlock = (id:number) => {

    // setLoading(true)
    return baseUrl.put(`/api/v1/Users/${id}`,{}, {
      headers,
      params: {
        pageSize: 5,
        pageNumber: 1,
      }
    })
      .then(() => {
        if (getToastValue)
          getToastValue("success", "Statue has been Changed")
        refetch()
      })
      .catch((err) => {
        if (getToastValue)
          getToastValue("error", err.response.data.message)
      })
  }
  return <>

    
    <main className='mt-1'>
      <div className=' d-flex justify-content-between align-items-center py-3 px-4 bg-white  '>
        <h2>Users</h2>
      </div>
      {tableData ? <>
      {tableData?.data?.length > 0 ?
      <div className='mx-4'>
      <table className="table  mt-3">
        <thead >
          <tr >
            <th className='ps-3'>User Name</th>
            <th>Statues</th>
            <th>Images</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Date Created</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>

          {tableData?.data.map((data: any) =>

            <tr key={data?.id} >
              <td data-cell="Title" className='Title ps-3' >{data?.userName}</td>
              <td data-cell="Statues ">{data?.isActivated?<span className="badge bg-success p-2">Active</span>:<span className="badge bg-danger p-2">Not Active</span>}</td>
              <td data-cell="Image ">{data?.imagePath === null ? <img className='img-table' src={NoDataImg} alt="image" /> : <img className='img-table' src={`http://upskilling-egypt.com:3003/` + data?.imagePath} alt="image" />}</td>
              <td data-cell="Phone ">{data?.phoneNumber}</td>
              <td data-cell="Email " className='text-truncate'>{data?.email}</td>
              <td data-cell="Date Created ">{moment(data?.creationDate).format("Do MMM YY")}</td>
              <td data-cell="Actions " className='action  align-items-center gap-3 '>

                {/* <span className={`delete text-center`} > */}
                  {/* <FaRegEye size={'20px'} /> */}
                  {/* onClick={() => showDeleteModal(data.id)}  */}
                {/* </span> */}

                  {data?.isActivated?<button className="btn btn-danger fw-bold  pointer" onClick={()=>onSubmitBlock(data.id)}>Block</button>: <button className="btn btn-success fw-bold  pointer" onClick={()=>onSubmitBlock(data.id)}>UnBlock</button>}

              </td>
            </tr>)}

        </tbody>

      </table>
      </div>
      :
      <div className='text-center mt-3 '>
          <img src={NoDataImg} alt="noData-img" />
          <h3 className='pt-1 mb-0'> No Data !</h3>

        </div>}
        </>: <LoadingIcon />}
    </main>
  </>
}

export default Users