import { response } from "express"
import * as auth from "./auth-token"

//http封装
export const http = async(url,token,customConfig)=>{
    const config = {
        method:"GET",
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": customConfig.data ? "application/json" : "",
        },
        ...customConfig,
    }
    return window.fetch(url,config)
    .then(async (response)=>{
        if(response.status==401){ //token失效
            await auth.logout()
            window.location.reload()
            return Promise.reject({mess:"请重新登录"})
        }
        const data = await response.json()
        //fetch的异常需要判断response.ok而不是直接根据状态码
        if(response.ok){
            return data
        }else{
            return Promise.reject(data)
        }
    })
}
//携带token的http
export const useHttp =()=>{
    //获取token
    const token = auth.getToken()
    return (url,customConfig)=>http(url,token,customConfig)
}