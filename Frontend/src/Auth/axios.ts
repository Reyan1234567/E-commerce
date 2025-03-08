import axios from "axios";
// import { useAuthStore } from "../Global/store";

const api = axios.create({
  baseURL: "http://localhost:3300",
  timeout: 100000,
});

type FQ={
    type:string
}

let isRefreshing=false;
let failedQueue:FQ[]=[]


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      config.headers.Authorization = "access token";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async(error) => {
    const originalRequest=error.config

    if(error.response?.status===401&&!originalRequest._retry){
        if(isRefreshing){
            return new Promise((resolve, reject)=>{
                failedQueue.push({resolve,reject})
            })
        }

        originalRequest._retry=true;
        isRefreshing=true

        try{
            const newAccessToken=await refreshToken();

            axios.defaults.headers.Authorization=`Bearer ${newAccessToken}`
            originalRequest.header.Authorization=`Bearer ${newAccessToken}`

            failedQueue.forEach(({resolve})=>resolve(axios(originalRequest)))
            failedQueue=[]

            return axios(originalRequest)
        }
        catch(error){
            failedQueue.forEach(({reject})=>reject(err))
            failedQueue=[]
        }
        finally{
            isRefreshing=false
        }

    }
    return Promise.reject(error);
  }
);
const refreshToken=async()=>{
    try{
        const refreshToken=localStorage.getItem("refreshToken")
        const response=await axios.post("/token",{refreshToken})
        const {accessToken}=response.data
        localStorage.setItem("accessToken", accessToken)
        return accessToken
    }
    catch(err){
        localStorage.clear()
        window.location.href = "/login";
        throw err

    }
}
export default api;


