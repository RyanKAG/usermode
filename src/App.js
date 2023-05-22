import { Routes, Route } from "react-router-dom";
import { AuthPage } from "./Pages/authPage";
import UserModePage from "./Pages/UserModePage";
function App() {
  return (
    <div className="flex">
      <Routes>
        <Route path="/login" Component={AuthPage}/>
        <Route path="/usermode" Component={UserModePage}/>
      </Routes>
    </div>
  );
}

export default App;
