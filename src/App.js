import React from "react";
import 'antd/dist/antd.css'
import { useAuth } from "./context/auth-context";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import { Spin } from "antd";

function App() {
  const {user,isLoading} = useAuth()
  return (
    <div className="App">
      <Spin tip="登录认证中，请稍等..." spinning={isLoading}>
        {user?<Main/>:<Login/>}
      </Spin>
    </div>
  );
}

export default App;
