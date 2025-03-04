import { createBrowserRouter } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/signup'
// import App from './App'

const routes =createBrowserRouter([
    {path:"/login",element:<Login/>},
    {path:"/signUp",element:<SignUp/>},
    // {path:"/",element:<App/>,children:[
    //     {path:"/home", elemnt:</>}
    // ]}
])

export default routes
