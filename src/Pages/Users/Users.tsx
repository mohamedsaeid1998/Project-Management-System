import { useContext } from 'react';

import { AuthContext } from '@/Context/AuthContext';
import UseAuthenticatedQuery from '@/utils/Hooks/UseAuthenticatedQuery';

import { MdBlock } from "react-icons/md";

import { ToastContext } from '@/Context/ToastContext';
import baseUrl from '@/utils/Custom/Custom';
import './Users.module.scss';
const Users = () => {



  const auth = useContext(AuthContext)
  let header = auth?.header
  
  const { data:tableData,refetch } = UseAuthenticatedQuery({
    queryKey: [`getAllTasks`],
    url: `http://upskilling-egypt.com:3003/api/v1/Users/?pageSize=5&pageNumber=1`,
    config: {
      headers:header
    }
  })

  console.log(tableData);






  // const [Loading, setLoading] = useState(false)
  const toast = useContext(ToastContext)

  const onSubmitBlock = (id:number) => {
console.log(id);

    // setLoading(true)
    return baseUrl.put(`/api/v1/Users/${id}`,{}, {
      headers:header
    })
      .then((res) => {
        console.log(res)
        if (toast)
          toast.getToastValue("success", "Statue has been Changed")
        // handleClose()
        // setLoading(false)
        refetch()
      })
      .catch((err) => {
        if (toast)
          toast.getToastValue("error", err.response.data.message)
        // setLoading(false)
      })

  }




// const [id, setId] = useState(0)

//   const [show, setShow] = useState(false)

//   const showBlockModal = (id:number) => {
//     setShow(true)
//     setId(id)
//     console.log(id);
    
//   }

//   const handleClose = () => {
//     setShow(false)
//   }



  return <>
    {/* <Modal show={show} onHide={handleClose}>
      <Modal.Body>

<form className='p-3'>
<h3>Are You Sure?</h3>
<button onClick={onSubmitBlock} className='btn btn-danger'>click here</button>
</form>

      </Modal.Body>
    </Modal> */}
    <main className='bg-white mt-1'>
      <div className='  p-3'>
        <h2>Users</h2>
      </div>

      <table className="table">
        <thead >
          <tr >
            <th className='ps-3'>User Name</th>
            <th>Statues</th>
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
              <td data-cell="name ">{data?.isActivated?"Active":"Not Active"}</td>
              <td data-cell="price ">{data?.phoneNumber}</td>
              <td data-cell="description ">{data?.email}</td>
              <td data-cell="tag ">{data?.creationDate}</td>
              <td data-cell="actions " className='action  align-items-center gap-3   '>

                {/* <span className={`delete text-center`} > */}
                  {/* <FaRegEye size={'20px'} /> */}
                  {/* onClick={() => showDeleteModal(data.id)}  */}
                {/* </span> */}

                <span className="edit text-danger pointer d-inline-block  ms-2 text-center">
                  <MdBlock size={'20px'} onClick={()=>onSubmitBlock(data.id)} />


                </span>


              </td>
            </tr>)}

        </tbody>

      </table>
    </main>
  </>
}

export default Users