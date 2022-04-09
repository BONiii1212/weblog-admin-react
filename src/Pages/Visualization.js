import { useAuth } from "../context/auth-context"
import { useUrlQueryParam } from "../utils/useUrlQueryParam"
import { useRef } from "react"
export default function Visualization(){
    const {user,login,logout} = useAuth()
    console.log(user)
    const [params,setParams] = useUrlQueryParam(["name","age"])
    console.log(params)
    return(
        <div>这里是数据可视化
            <button onClick={()=>{setParams({name:"qxl"})}}>修改name</button>
        </div>
    )
}