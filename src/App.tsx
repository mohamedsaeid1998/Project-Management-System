import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { AuthLayout, MasterLayout, NotFound, ProtectedRoute } from "./Components"
import { AddNewProject, AddNewTask, ChangePassword, EditProject, EditTask, ForgetPassword, Home, Login, Projects, Register, ResetPassword, Tasks, Users, Verify } from "./Pages"

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
      path: 'dashboard', element: <ProtectedRoute><MasterLayout /></ProtectedRoute>, errorElement: <NotFound />, children: [
        { index: true, element: <Home /> },
        { path: "users", element: <Users /> },
        { path: "projects", element: <Projects /> },
        { path: "add-project", element: <AddNewProject /> },
        { path: "edit-project/:id", element: <EditProject /> },
        { path: "tasks", element: <Tasks /> },
        { path: "add-task", element: <AddNewTask /> },
        { path: "edit-task/:id", element: <EditTask /> },
      ]
    },
  ])

  return <>
    <RouterProvider router={routes} />
  </>

}

export default App
