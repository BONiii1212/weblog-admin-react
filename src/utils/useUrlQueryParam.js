import { useSearchParams } from "react-router-dom"
import { useMemo } from "react"

//封装useSearchParams，url中进行状态管理
export const useUrlQueryParam = (keys) => {
    const  [searchParams, setSearchParam] = useSearchParams() //URLSearchParams类型
    return [
        //获取想要的参数
        useMemo(
            ()=>{
                return keys.reduce((pre,key)=>{
                    return {...pre, [key]:searchParams.get(key) || "" }
                },{})
            },[searchParams]),
        //设置这些参数的方法
        (param)=>{
            const o = {...Object.fromEntries(searchParams),...param}
            //过滤掉不要的属性
            const arr = Object.keys(o).filter(key=>keys.includes(key))
            const newParams = arr.reduce((pre,key)=>{
                return {...pre, [key]:o[key]}
            },{})
            return setSearchParam(newParams)
        }
    ]
}