import React from "react";
import { BrowserRouter as Router,Route,Routes,Navigate} from "react-router-dom";
import AdminIndex from "./AdminIndex";

function Main(){
    return(
        <Router>
            <Routes>
                <Route path={"/index/*"} element={<AdminIndex/>}/>
                <Route path={"/"} element={<Navigate to={"/index"} />} />
            </Routes>
        </Router>   
    )
}

export default Main