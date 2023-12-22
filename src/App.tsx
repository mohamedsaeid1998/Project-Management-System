import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { AuthLayout, MasterLayout, NotFound } from "./Components"
import { ChangePassword, ForgetPassword, Home, Login, Projects, Register, ResetPassword, Tasks, Users, Verify } from "./Pages"



function App() {

  const routes = createBrowserRouter([
    {
      path: '/', element: <AuthLayout />, errorElement: <NotFound />, children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "verify", element: <Verify /> },
        { path: "changePassword", element: <ChangePassword /> },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "resetPassword", element: <ResetPassword /> },
      ]
    },
    {
      path: 'dashboard', element: <MasterLayout />, errorElement: <NotFound />, children: [
        { index: true, element: <Home /> },
        { path: "users", element: <Users /> },
        { path: "projects", element: <Projects /> },
        { path: "tasks", element: <Tasks /> },
      ]
    },
  ])

  return <>
<RouterProvider router={routes}/>
  </>

}

export default App
