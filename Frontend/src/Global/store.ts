import {create} from 'zustand'

export const UseAuthStore=create((set)=>({
    accessToken:null,
    refreshToken:null,
    setAccesstoken:(accessToken:string)=>{
        set(()=>({accessToken:accessToken}))
    },
    setRefreshtoken:(refreshToken:string)=>{
        set(()=>({refreshToken:refreshToken}))
    },
    clearTokens:()=>{
        set(()=>({accessToken:null, refreshToken:null}))
    }
}))