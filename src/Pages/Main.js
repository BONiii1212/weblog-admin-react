import React from "react";
import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
import AdminIndex from "./AdminIndex";
import Login from "./Login";

function Main(){
    return(
        <Router>
            <Routes>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/adminIndex"} element={<AdminIndex/>}/>
            </Routes>
        </Router>
    )
}

export default Main