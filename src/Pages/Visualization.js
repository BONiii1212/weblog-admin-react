import { useAuth } from "../context/auth-context"
import { useEffect} from "react"
import { useMenu } from "../context/menu-context"

export default function Visualization(){
    const {user,login,logout} = useAuth()
    const {openKeys,selectedKeys,changeOpen,changeSelect} = useMenu()
    
    useEffect(()=>{
        changeOpen([])
        changeSelect(['1'])
    },[])
    return(
        <div>这里是数据可视化界面
        </div>
    )
}