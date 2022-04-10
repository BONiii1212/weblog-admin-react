import React from "react";
import 'antd/dist/antd.css'
import { useAuth } from "./context/auth-context";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import { Spin } from "antd";

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      {user?<Main/>:<Login/>}
    </div>
  );
}

export default App;
