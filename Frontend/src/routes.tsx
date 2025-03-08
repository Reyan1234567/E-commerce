import { createBrowserRouter } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/signup'
import Home from './pages/Home'
// import App from './App'

const routes =createBrowserRouter([
    {path:"/login",element:<Login/>},
    {path:"/signUp",element:<SignUp/>},
    // {path:"/",element:<App/>,children:[
    //     {path:"/home", elemnt:</>}
    // ]}
    {path:"/home",element:<Home/>}
])

export default routes
