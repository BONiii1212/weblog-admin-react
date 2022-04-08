import { useAuth } from "../context/auth-context"
export default function Visualization(){
    const {user,login,logout} = useAuth()
    return(
        <div>这里是数据可视化</div>
    )
}