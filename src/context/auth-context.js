import { useAsync } from "../utils/use-async"
import * as auth from "../utils/auth-provider"
import { http } from "../utils/http-with-token"
import servicePath from "../config/apiUrl"
import React, { useEffect } from "react"
import { FullPageLoading,FullPageErrorFallback } from "../components/lib"

const AuthContext = React.createContext() //创建容器
AuthContext.displayName = "AuthContext"

//从本地的token获取用户数据
const restoreUserState = async () => {
    let user = null
    const token = auth.getToken()
    if(token){
        const data = await http(servicePath.getUserState,token,{})
        user = data
    }
    return user
}

export const AuthProvider = ({children}) => {
    const {
        data:user,
        error,
        isLoading,
        isIdle,
        isError,
        isSuccess,
        run,
        setData:setUser
    } = useAsync()

    const login = (data)=> auth.login(data).then(user=>setUser(user))
    const logout = () => auth.logout().then(()=>setUser(null))

    useEffect(()=>{
        run(restoreUserState())
    },[])
    
    if(isLoading){
        return <FullPageLoading/>
    }
    
    if(isError){
        return <FullPageErrorFallback/>
    }

    return (
        <AuthContext.Provider
            children={children}
            value={{user,login,logout}}
        />
    )
}
export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if(!context){
        throw new Error("useAuth必须在AuthProvider中使用")
    }
    return context
}