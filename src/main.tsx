import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.tsx'
import AuthContextProvider from './Context/AuthContext.tsx'
import ToastContextProvider from './Context/ToastContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './Styles/global.scss'
import ProjectContextProvider from './Context/ProjectContext.tsx'
import TasksContextProvider from './Context/TasksContext.tsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
HTML5Backend


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
  <ToastContextProvider>
    <TasksContextProvider>
    <ProjectContextProvider>
      <AuthContextProvider>
      <ToastContainer  />
      <DndProvider backend={HTML5Backend} >
        <App />
        </DndProvider>
      </AuthContextProvider>
    </ProjectContextProvider>
    </TasksContextProvider>
    </ToastContextProvider>
    </QueryClientProvider>
)



