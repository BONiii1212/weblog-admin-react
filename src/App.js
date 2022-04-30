import React from "react";
import 'antd/dist/antd.css'
import { useAuth } from "./context/auth-context";
import Login from "./Pages/Login";
import Main from "./Pages/Main";

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      {user?.token?<Main/>:<Login/>}
    </div>
  );
}

export default App;
