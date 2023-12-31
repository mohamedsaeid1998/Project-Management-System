import { DoneIcon, ProgressIcon, TodoIcon } from '@/Assets/Images'
import './Home.module.scss'
import UseAuthenticatedQuery from '@/utils/Hooks/UseAuthenticatedQuery'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/Context/AuthContext'
import baseUrl from '@/utils/Custom/Custom'
import { LoadingIcon } from '@/Components'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'




const Home = () => {

  const { headers, adminData } = useContext(AuthContext)



  const { data: tableData } = UseAuthenticatedQuery({
    queryKey: [`getManagerProjects`],
    url: `http://upskilling-egypt.com:3003/api/v1/Task/count`,
    config: {
      headers
    }
  })


  if (tableData)
    var { done, inProgress, toDo } = tableData



  const [userCount, setUserCount] = useState<any>(null)

  const getUsersCount = () => {
    return baseUrl.get(`/api/v1/Users/count`, {
      headers,
    })
      .then((res) => {
        setUserCount(res.data)
      })

  }


  useEffect(() => {

    // if (userRole === "Manager") {
      getUsersCount()
    // } else {
    //   return null
    // }



  }, [])


  const activated = userCount?.activatedEmployeeCount;
  const deactivated = userCount?.deactivatedEmployeeCount;

  const TasksDetails = [
    { cardColor: "tasksTodo", iconBgColor: "tasksBg", icon: TodoIcon, status: "Todo", number: toDo },
    { cardColor: "tasksProgress", iconBgColor: "progressBg", icon: ProgressIcon, status: "InProgress", number: inProgress },
    { cardColor: "tasksDone", iconBgColor: "doneBg", icon: DoneIcon, status: "Done", number: done }
  ]

  const UsersDetails = [
    { cardColor: "tasksTodo", iconBgColor: "tasksBg", icon: TodoIcon, status: "ActiveUser", number: activated },
    { cardColor: "tasksProgress", iconBgColor: "progressBg", icon: ProgressIcon, status: "DesActiveUser", number: deactivated },
  ]



  const TasksData = [
    { name: "ToDo", value: toDo, color: "#0088FE" },
    { name: "InProgress", value: inProgress, color: "#00C49F" },
    { name: "Done", value: done, color: "#FFBB28" },
  ];


  const UsersData = [
    { name: "ActiveEmp", value: activated, color: "#FF8042" },
    { name: "DeActiveEmp", value: deactivated, color: "#8dd1e1" },
  ];





  return <>
    <main className='HomePicture ps-5 py-5 '>
      <div className="container">

        <div className='w-100 homeHeader py-5 px-4 text-white mb-4'>

          <h1 className='mb-4 mt-3 fw-normal '>Welcome <span className='orange'>{adminData?.userName}</span></h1>
          <p className='fs-3 mb-5'>You can add project and assign tasks to your team</p>
        </div>

        <div className="row g-3 p-2  ">

          <div className="col-md-6 p-3  bg-white homeTasks">
            <h5 className='mb-0'>Tasks</h5>
            <p className='text-muted'>Lorem ipsum dolor sit amet,consecteture</p>
            <div className="row">
              {tableData ? <>
                {TasksDetails.map((ele) =>
                  <div key={ele.icon} className="col-md-4 ">

                    <div className={`d-flex flex-column ${ele.cardColor} p-3 rounded-4`}>

                      <div className={`IconContainer ${ele.iconBgColor} p-1 mb-2`}>
                        <img src={ele.icon} alt="Icon" />
                      </div>
                      <h6 className='mb-0'>{ele.status}</h6>
                      <span className='fs-4 fw-medium'>{ele.number}</span>
                    </div>
                  </div>
                )}</>

                : <LoadingIcon />}




            </div>
          </div>


          <div className="col-md-6 p-3 bg-white ">

            <h5 className='mb-0'>Progress</h5>
            <p className='text-muted'>Lorem ipsum dolor sit amet,consecteture</p>
            {tableData ? <><div className="chart">
              <ResponsiveContainer width="99%" height={150}>
                <PieChart >
                  <Tooltip contentStyle={{ background: "white", borderRadius: "5px" }} />
                  <Pie
                    data={TasksData}
                    innerRadius={"70%"}
                    outerRadius={"90%"}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {TasksData.map((item) => (
                      <Cell key={item.name} fill={item.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
              <div className="options">
                {TasksData.map((item) => <div key={item.name} className="option">
                  <div className="titles">
                    <div className="dot" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                </div>

                )}
              </div></> : <LoadingIcon />}


          </div>


        </div>

        <div className="row g-3 p-2">
          <div className="col-md-6 p-3 bg-white homeTasks">
            <h5 className='mb-0'>Users</h5>
            <p className='text-muted'>Lorem ipsum dolor sit amet,consecteture</p>
            <div className="row">
              {tableData ? <>
                {UsersDetails.map((ele) =>
                  <div key={ele.icon} className="col-md-4 ">

                    <div className={`d-flex flex-column ${ele.cardColor} p-3 rounded-4`}>

                      <div className={`IconContainer ${ele.iconBgColor} p-1 mb-2`}>
                        <img src={ele.icon} alt="Icon" />
                      </div>
                      <h6 className='mb-0'>{ele.status}</h6>
                      <span className='fs-4 fw-medium'>{ele.number}</span>
                    </div>
                  </div>
                )}</>

                : <LoadingIcon />}




            </div>
          </div>

          <div className="col-md-6 p-3 bg-white ">

            <h5 className='mb-0'>Users Statue</h5>
            <p className='text-muted'>Lorem ipsum dolor sit amet,consecteture</p>
            {userCount ? <><div className="chart">
              <ResponsiveContainer width="99%" height={150}>
                <PieChart >
                  <Tooltip contentStyle={{ background: "white", borderRadius: "5px" }} />
                  <Pie
                    data={UsersData}
                    innerRadius={"70%"}
                    outerRadius={"90%"}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {UsersData.map((item) => (
                      <Cell key={item.name} fill={item.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
              <div className="options">
                {UsersData.map((item) => <div key={item.name} className="option">
                  <div className="titles">
                    <div className="dot" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                </div>

                )}
              </div></> : <LoadingIcon />}


          </div>
        </div>



      </div>
    </main>
  </>
}

export default Home