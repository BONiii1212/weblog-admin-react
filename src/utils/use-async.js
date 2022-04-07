import React,{ useState } from "react"
//使用自定义hook，给异步请求添加idle｜loading｜error｜success状态
export const useAsync = ()=>{
    const [state,setState] = useState({
        stat:"idle",
        data:null,
        error:null
    })
    //赋值更改状态
    const setData = (data)=>{
        setState({
            state:"success",
            data:data,
            error:null,
        })
    }
    //报错时更改状态
    const setError = (error)=>{
        setState({
            state:"error",
            data:null,
            error:error
        })
    }
    //用于执行异步请求，管理状态
    const run = (requestPromise)=>{
        if(!requestPromise.then){
            throw new Error("请传入Promise类型的数据")
        }
        setState({...state,stat:"loading"}) //loading
        return Promise.then((data)=>{
            setData(data)                   //success
            return data
        }).catch((error)=>{
            setError(error)                 //error
            return error
        })
    }
    return{
        isIdle: state.stat === "idle",
        isLoading: state.stat === "loading",
        isError: state.stat === "error",
        isSuccess: state.stat === "success",
        run,
        setData,
        setError,
        ...state
    }
}