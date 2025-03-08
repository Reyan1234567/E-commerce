import React from 'react'
import {check} from '../Auth/checkAuth.ts'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
const navigate=useNavigate()
    const result=check()
    if(!result){
        navigate('/login')
    }
    else if(result.role===user){
        return <div>
            Hello ordinary User
        </div>
    }
    else if(result.role===admin){
        return <div>
            Hello Reyan
        </div>
    }
  
}

export default Dashboard
