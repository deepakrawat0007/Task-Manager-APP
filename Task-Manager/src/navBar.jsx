import { useNavigate } from "react-router-dom"
const NavBar = () => {
  const navigate = useNavigate("")

  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
  }
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light new-col navBar-new-style">
        <div class="container-fluid">
          <span class="navbar-brand" style={{color:"white"}}>Task Manager</span>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <span class="nav-link active" style={{ cursor: "pointer", color:"white" }} aria-current="page" onClick={() => navigate("/home")}>Home</span>
              </li>
              <li class="nav-item">
                <span class="nav-link" style={{ cursor: "pointer", color:"white" }} onClick={() => navigate("/tasks")}>Tasks</span>
              </li>
              <li class="nav-item">
                <button class="nav-link" style={{ cursor: "pointer", color:"white" }} onClick={handleLogout}>Logout</button>
              </li>


            </ul>

          </div>
        </div>
      </nav></>
  )
}
export default NavBar