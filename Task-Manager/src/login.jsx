import { useState, useContext } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ToastContext from "./context/ToastContext";
import spinner from "./assets/Spinner-0.5s-164px.svg";
const API = "https://task-manager-api-tsgq.onrender.com"

const Login = () => {
	const [data, setData] = useState({
		email: "",
		password: ""
	})
	const { toast } = useContext(ToastContext)
	const [loading , setLoading] = useState(false)   
	const navigate = useNavigate("")

	const APICALL = async () => {
		await axios.post(API + "/login", {
			email: data.email,
			password: data.password
		})
			.then((res) => {
				setLoading(false)
				toast.success("Login Success")
				localStorage.setItem('token', res.data.token)
				navigate("/home")
			}).catch((e) => {
				setLoading(false)
				// console.log(e.message)
				toast.error(e.response.data.message)
			})
	}
	const handleNavigate = () => {
		navigate("/register")
	}
	const handleChange = (e) => {
		const newdata = { ...data }
		newdata[e.target.name] = e.target.value
		setData(newdata)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setLoading(true)
		const call = APICALL()
		toast.promise(call, {
			loading: "loading..."
		})
	}

	return (
		<>
			<div className="limiter">
			{loading?<div className="spinner"><img src={spinner} alt="spinner"/></div>:''}
				<div className="container-login100" style={{ backgroundImage: "url(/bg-01.jpg)" }}>
					<div className="wrap-login100">
						<form className="login100-form validate-form">
							<span className="login100-form-logo">
								<i className="zmdi zmdi-landscape"></i>
							</span>

							<span className="login100-form-title p-b-34 p-t-27">
								Log in
							</span>

							<div className="wrap-input100 validate-input">
								<input className="input100" type="email" name="email" placeholder="Email" value={data.email} onChange={(e) => handleChange(e)} />
								<span className="focus-input100" data-placeholder="&#xf207;"></span>
							</div>

							<div className="wrap-input100 validate-input" data-validate="Enter password">
								<input className="input100" type="password" name="password" placeholder="Password" value={data.password} onChange={(e) => handleChange(e)} />
								<span className="focus-input100" data-placeholder="&#xf191;"></span>
							</div>

							<div className="contact100-form-checkbox">
								<input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
								<label className="label-checkbox100" htmlFor="ckb1">
									Remember me
								</label>
							</div>

							<div className="container-login100-form-btn">
								<button className="login100-form-btn" onClick={(e) => handleSubmit(e)}>
									Login
								</button>
							</div>

							<div className="text-center p-t-90">
								<span className="txt1" style={{ cursor: "pointer" }} onClick={handleNavigate}>
									Register
								</span>
							</div>
						</form>
					</div>
				</div>
			</div>


			<div id="dropDownSelect1"></div>
		</>
	)
}
export default Login