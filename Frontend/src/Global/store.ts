import {create} from 'zustand'

export const useAuthStore=create((set)=>({
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