import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from "./routes"
import { RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <RouterProvider router={router}/> */}
    <Navbar/>
  </StrictMode>,
)
