import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider,Route,Link} from "react-router-dom"
import Calculate from './components/Calculate.jsx'
import Stock from './components/Stock.jsx'
import History from './components/History.jsx'


const router = createBrowserRouter([
  {
    path: "/calculate",
    element: <Calculate />,
  },
  {
    path: "/stock",
    element: <Stock />,
  },
  {
    path: "/history",
    element: <History />,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
