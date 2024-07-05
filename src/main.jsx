import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider,createBrowserRouter} from 'react-router-dom'
import Register from './pages/register.jsx'
import Login from './pages/login.jsx'
import UserList from './pages/user-list.jsx'
import UserDetails from './pages/user-details.jsx'
import UserEdit from './pages/user-edit.jsx'
import ChangePassword from './pages/change-password.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Login/>
      },
      {
        path: '/register',
        element: <Register/>
      },
      {
        path: '/user-list',
        element: <UserList/>
      },
      {
        path: '/user-details',
        element: <UserDetails/>
      },
      {
        path: '/user-edit',
        element: <UserEdit/>
      },
      {
        path: '/change-password',
        element: <ChangePassword/>
      }
    ]
  }
])






ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
