import { useEffect } from "react"
import { useHttp } from "./http-with-token"
import { useAsync } from "./use-async"
import servicePath from "../config/apiUrl"

export const useGetTypeInfo= () =>{
    const {run, ...result} = useAsync()
    const httpWithToken = useHttp()
    useEffect(()=>{
        run(httpWithToken(servicePath.getTypeInfo))
    },[])
    return result
}

// export const useGetArticleById = (id)=>{
//     const {run, ...result} = useAsync()
//     const httpWithToken = useHttp()
//     useEffect(()=>{
//         run(httpWithToken(servicePath.getArticleById+id))
//     },[])
//     return result
// }

// export const useDelArticle = () =>{
//     const {run, ...result} = useAsync()
//     const httpWithToken = useHttp()
//     const mutate = (id)=>{
//         return run(httpWithToken(servicePath.delArticle+id))
//     }
//     return {
//         mutate,
//         ...result
//     }
// }