import axios from "axios";
import { useState, useContext } from "react";
import "./page.css"
import ToastContext from "./context/ToastContext";
const API = "https://task-manager-api-tsgq.onrender.com"
const ChnageImagePrompt = ({ closePrompt }) => { // got the Id and Close Prompt func as prop
    // console.log(Id)
    const { toast } = useContext(ToastContext)
    const [data, setData] = useState({   //for storing the data
        image: ""
    })

    const handleChange = (e) => {
        const newData = { ...data }
        newData[e.target.id] = e.target.value
        setData(newData)
    }
    const handleSubmit = (e) => {  // sending the request Backend to delete the image 
        e.preventDefault()
        // console.log(data.password)
        axios.put(`${API}/updateProfilePic`,
            { image: data.image }, {
            headers: { "authorization": localStorage.getItem("token") }
        })
            .then((res) => {
                toast.success("Image Updated")
                closePrompt()
            }).catch((e) => {
                // console.log(e.response)
                toast.error(e.response.data.message)
            })
    }
    return (
        <>
            <div className="innerBox">
                <form>
                    <p>Enter Image Link</p>
                    <input type="text" id="image" value={data.image} onChange={(e) => { handleChange(e) }} />
                    <button id="delete" onClick={(e) => { handleSubmit(e) }}>Confirm</button>
                    <button onClick={closePrompt}>Cancel</button>
                </form>
            </div>

        </>
    )
}

export default ChnageImagePrompt