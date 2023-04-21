import NavBar from "./navBar";
import Profile from "./profile";

const DashBoard = () =>{
    return (
        <div className="container-login100" style={{ backgroundImage: "url(/bg-01.jpg)", margin:"0",padding:"0" }}>
        <NavBar/>
        <Profile/>
        </div>
    )
}
export default DashBoard;