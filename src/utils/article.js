import { useEffect } from "react"
import { useHttp } from "./http-with-token"
import { useAsync } from "./use-async"
import servicePath from "../config/apiUrl"

//获取下拉栏中所有文章类型
export const useGetTypeInfo= () =>{
    const {run, ...result} = useAsync()
    const httpWithToken = useHttp()
    useEffect(()=>{
        run(httpWithToken(servicePath.getTypeInfo))
    },[])
    return result
}

//获取博客列表
export const useGetArticleList=()=>{
    const {run, ...result} = useAsync()
    const httpWithToken = useHttp()
    const getList = () =>{
        return run(httpWithToken(servicePath.getArticleList))
    }
    return {getList, ...result}
}

//删除文章
export const useDelArticle=()=>{
    const {run, ...result} = useAsync()
    const httpWithToken = useHttp()
    const del = (id)=>{
        return run(httpWithToken(servicePath.delArticle+id))
    }
    return {del, ...result}
}