import React, { useState,useMemo } from "react"

const MenuContext = React.createContext()
MenuContext.displayName = "MenuContext"

export const MenuProvider = ({children}) => {
    const [openKeys,setOpenKeys] = useState([])
    const [selectedKeys,setSelectedKeys] = useState(['1'])

    const changeOpen = useMemo(()=>(keys) =>{
        setOpenKeys(keys)
    },[setOpenKeys])

    const changeSelect = useMemo(()=>(keys)=>{
        setSelectedKeys(keys)
    },[setSelectedKeys])

    return(
        <MenuContext.Provider
            children={children}
            value={{openKeys,selectedKeys,changeOpen,changeSelect}}
        />
    )
}

export const useMenu=()=>{
    const context = React.useContext(MenuContext)
    if(!context){
        throw new Error("useMenu必须在AuthProvider中使用")
    }
    return context
}