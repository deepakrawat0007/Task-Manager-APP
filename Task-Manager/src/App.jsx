import { ToastContextProvider } from "./context/ToastContext";
import DashBoard from "./dashBoard";
import Login from "./login";
import Register from "./Register";
import {BrowserRouter , Route , Routes} from "react-router-dom"
import Tasks from "./tasks";

const App = () =>{
  return(
    <>
    <BrowserRouter>
    <ToastContextProvider>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/home" element={<DashBoard/>}/>
      <Route path="/tasks" element={<Tasks/>}/>
    </Routes>
    </ToastContextProvider>
    </BrowserRouter>
    </>
  )
}

export default App;