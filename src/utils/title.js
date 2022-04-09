import { useEffect,useRef } from "react"

export const useDocumentTile = (title,keepOnUnmount)=>{
    const oldTitle = useRef(document.title).current //如果不使用useRef，首先保存旧title，页面更新以后又会将新title赋给它

    //更新title
    useEffect(()=>{
        document.title=title
    },[title])

    //组件被卸载时返回旧的title
    useEffect(()=>{
        return ()=>{
            if(!keepOnUnmount){
                document.title=oldTitle
            }
        }
    },[])
}