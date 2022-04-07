import servicePath from "../config/apiUrl";

const localStorageKey = "__auth_provider_token__";// 保存本地存储中的token键
export const getToken = () => window.localStorage.getItem(localStorageKey); // 获取本地token的值

//本地存储token的方法
export const savaTokenFromResponse = (result) =>{
    window.localStorage.setItem(localStorageKey,result.token || "")
}

//登录方法 data={userName,password}
export const login = (data)=>{
    return fetch(servicePath.checkLogin,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(data)
    }).then(async (response)=>{
        if(response.ok){
            const data = await response.json()
            savaTokenFromResponse(data)
            return Promise.resolve(data)
        }else{
            return Promise.reject(await response.json())
        }
    })
}

//登出的方法
export const logout = async()=>{
    window.localStorage.removeItem(localStorageKey) //清除本地的tokne
}