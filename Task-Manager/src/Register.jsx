import { useState , useContext} from "react";
import axios from "axios";
import ToastContext from "./context/ToastContext"
import {useNavigate} from "react-router-dom"
const API = "http://localhost:5000"
const Register = ()=>{
	const navigate = useNavigate("")
	const {toast} = useContext(ToastContext)

	const [data , setData] = useState({
		firstName:"",
		lastName:"",
		email:"",
		password:"",
		country:"",
		occupation:"",
		image:"",
		phone:""
	})

	
	const APICALL = async () => {
		await axios.post(API+"/register", {
			firstName:data.firstName,
			lastName:data.lastName,
			phone:data.phone,
			occupation:data.occupation,
			image:data.image,
			country:data.country,
            email:data.email,
            password:data.password
		})
		  .then((res) => {
			toast.success("Registered SuccessFully")
			navigate("/")
		  }).catch((e) => {
			toast.error(e.response.data.message)
		  })
	  }
	const handleChange =(e)=>{         // storing form data
        const newData = {...data}
        newData[e.target.name] = e.target.value
        setData(newData)
    }

	const handleSubmit=(e)=>{            // sending data to backend
        e.preventDefault()
		const call = APICALL()
		toast.promise(call, {
		  loading: "Loading>>>",
		})
    }
    return (
        <>
        	<div className="limiter">
		<div className="container-login100" style={{backgroundImage:"url(images/bg-01.jpg)"}}>
			<div className="wrap-login100">
				<form className="login100-form validate-form">
					<span className="login100-form-logo">
						<i className="zmdi zmdi-landscape"></i>
					</span>

					<span className="login100-form-title p-b-34 p-t-27">
						Register
					</span>

                    <div className="wrap-input100 validate-input" data-validate = "name">
						<input className="input100" type="text" name="firstName" placeholder="First Name" value={data.firstName} onChange={(e)=>{handleChange(e)}}/>
						<span className="focus-input100" data-placeholder="&#xf207;"></span>
					</div>
                    <div className="wrap-input100 validate-input" data-validate = "name">
						<input className="input100" type="text" name="lastName" placeholder="Last Name" value={data.lastName} onChange={(e)=>{handleChange(e)}}/>
						<span className="focus-input100" data-placeholder="&#xf207;"></span>
					</div>
					<div className="wrap-input100 validate-input" data-validate = "Enter username">
						<input className="input100" type="email" name="email" placeholder="Email" value={data.email} onChange={(e)=>{handleChange(e)}}/>
						<span className="focus-input100" data-placeholder="&#9993;"></span>
					</div>
                    <div className="wrap-input100 validate-input">
						<input className="input100" type="text" name="country" placeholder="Country" value={data.country} onChange={(e)=>{handleChange(e)}}/>
						<span className="focus-input100" data-placeholder="&#127760;"></span>
					</div>
                    <div className="wrap-input100 validate-input">
						<input className="input100" type="text" name="occupation" placeholder="Occupation" value={data.occupation} onChange={(e)=>{handleChange(e)}}/>
						<span className="focus-input100" data-placeholder="&#128187;"></span>
					</div>
                    <div className="wrap-input100 validate-input">
						<input className="input100" type="tel" name="phone" placeholder="Mobile Number" value={data.phone} onChange={(e)=>{handleChange(e)}}/>
						<span className="focus-input100" data-placeholder="&#9742;"></span>
					</div>
                    <div className="wrap-input100 validate-input">
						<input className="input100" type="url" name="image" placeholder="Avatar Link (Optional)" value={data.image} onChange={(e)=>{handleChange(e)}}/>
						<span className="focus-input100" data-placeholder="&#xf207;"></span>
					</div>
					<div className="wrap-input100 validate-input" data-validate="Enter password">
						<input className="input100" type="password" name="password" placeholder="Password" value={data.password} onChange={(e)=>{handleChange(e)}}/>
						<span className="focus-input100" data-placeholder="&#xf191;"></span>
					</div>

					<div className="container-login100-form-btn">
						<button onClick={(e)=>{handleSubmit(e)}} className="login100-form-btn">
							Register
						</button>
					</div>

					<div className="text-center p-t-90">
                        <span className="txt1" style={{cursor:"pointer"}} onClick={()=>navigate("/")}>
							Login
						</span>
					</div>
				</form>
			</div>
		</div>
	</div>
	

	
    </>
    )
}

export default Register