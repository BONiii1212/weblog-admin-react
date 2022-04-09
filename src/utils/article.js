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

//添加文章
export const useAddArticle = () => {
    const {run, ...result} = useAsync()
    const httpWithToken = useHttp()
    const add = (data)=>{
        return run(httpWithToken(servicePath.addArticle,{method:'POST',body:JSON.stringify(data)}))
    }
    return {add, ...result}
}

//更新文章
export const useUpdateArticle = () => {
    const {run, ...result} = useAsync()
    const httpWithToken = useHttp()
    const update = (data) =>{
        return run(httpWithToken(servicePath.updateArticle,{method:'POST',body:JSON.stringify(data)}))
    }
    return {update, ...result}
}

//通过id获取文章详情，用于修改文章
export const useGetArticleById = () => {
    const {run, ...result} = useAsync()
    const httpWithToken = useHttp()
    const getArticleDetails = (id) =>{
        return run(httpWithToken(servicePath.getArticleById+id))
    } 
    return {getArticleDetails, ...result}
}