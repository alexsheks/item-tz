import { createBrowserRouter } from 'react-router-dom'

import Home from '../pages/Home'
import Layout from '../layout/layout'
import Edit from '../pages/Edit'

// router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <Home />,
        index: true
      },
      {
        element: <Edit />,
        path: '/edit/:id'
      }
    ]
  }
])

export default router
