import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.jsx'
import { Vhod } from './Vhod.jsx'
import { Reg } from './Reg.jsx'
import { createBrowserRouter, RouterProvider} from "react-router-dom"

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />
	},
	{
		path: "/vhod",
		element: <Vhod />
	},
	{
		path: "/reg",
		element: <Reg />
	}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
