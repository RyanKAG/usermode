import { Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from "./Pages/authPage";
import { useEffect, useState } from "react";
import { isLoggedIn } from "./Services/AuthService";
import UserModePage from "./Pages/UserModePage";
import {soc} from "./soc"
function App() {
  const [isConnected, setIsConnected] = useState(soc.connected);
  
  useEffect(() => {
    soc.on("connect", () => {
      setIsConnected(true);
    });
    soc.on("disconnect", () => {
      setIsConnected(false);
    });
  }, []);



  return (
    <div className="flex">
      <Routes>
        <Route path="/login" Component={AuthPage}/>
        <Route path="/usermode" element={<UserModePage/>}/>
        <Route path="/" element={isLoggedIn() ? <Navigate to="usermode"/> : <Navigate to="/login"/> }/>
      </Routes>
    </div>
  );
}

export default App;
