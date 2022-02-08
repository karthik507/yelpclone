import React from "react";
import {BrowserRouter as  Router, Route, Routes} from  "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import RestaurentdetailPage from "./routes/RestaurentdetailPage";
import { RestaurentsContextProvider } from "./context/RestaurentsContext";

const App = () =>{
    return(
        <RestaurentsContextProvider>
        <div className="container">
        <Router>
           <Routes>
           <Route exact path="/" element={<Home/>}/>
           <Route exact path="/restaurents/:id/update" element={<UpdatePage/>}/>
           <Route exact path="/restaurents/:id" element={<RestaurentdetailPage/>}/>
           </Routes> 
       </Router>     
        </div>   
        </RestaurentsContextProvider>    
    )
}
export default App; 