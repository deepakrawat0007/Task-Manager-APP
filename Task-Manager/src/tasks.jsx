import NavBar from "./navBar"
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import axios from "axios"
import moment from 'moment';
import "./page.css"
import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import ToastContext from "./context/ToastContext";
import Footer from "./footer";
const API = "https://task-manager-api-tsgq.onrender.com"

const Tasks = () => {
    const [data, setData] = useState({
        task: ""
    })
    const navigate = useNavigate("")
    const [editId, setEditId] = useState("")
    const [tasks, setTasks] = useState([])
    const [edit, setEdit] = useState(false)
    const { toast } = useContext(ToastContext);

    const formatDate = (date) => {
        const dateObj = moment(date);
        return dateObj.format('DD/MM/YYYY');
    };
    const formatTime = (Time) => {
        const dateObj = moment(Time);
        return dateObj.format('hh:mm A');
    };

    const APICALL = async () => {
        await axios.get(API + "/tasks", { headers: { "authorization": localStorage.getItem('token') } })
            .then((res) => {
                setTasks(res.data.tasks)
                console.log(res)
            })
            .catch((e) => {
                // console.log(e.message)
                toast.error(e.response.data.message)
            })
    }
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/")
        }
        APICALL()
    }, [])
    const handleTaskComp = (id , status) => {
        console.log(status)
        axios.put(`${API}/updateTaskStatus/${id}`, {status:status}, { headers: { "authorization": localStorage.getItem('token') } })
            .then((res) => {
                setTasks(res.data.tasks)
            })
            .catch((e) => {
                toast.error(e.response.data.message)
            })
    }
    const handleChange = (e) => {
        const newdata = { ...data }
        newdata[e.target.name] = e.target.value
        setData(newdata)
    }
    const handleDeleteTask = (id) => {
        axios.delete(`${API}/deleteTask/${id}`, { headers: { "authorization": localStorage.getItem('token') } })
            .then((res) => {
                toast.success(res.data.message)
                setTasks(res.data.tasks)
            })
            .catch((e) => {
                toast.error(e.response.data.message)
            })
    }
    const handleAddTask = (e) => {
        // console.log(data.task)
        e.preventDefault()
        axios.post(API + "/AddTasks", {
            task: data.task
        }, { headers: { "authorization": localStorage.getItem('token') } })
            .then((res) => {
                // console.log(res)
                setTasks(res.data.tasks)
                toast.success("Task Added SuccessFully")
                setData({ task: "" })
            })
            .catch((e) => {
                // console.log(e)
                toast.error(e.message)
            })

    }
    const handleEditTask = (id, task) => {
        setEdit(true)
        setData({ task: task })
        setEditId(id)
    }
    const SubmitEditTask = async () => {
        await axios.put(`${API}/updateTask/${editId}`, { task: data.task }, { headers: { "authorization": localStorage.getItem('token') } })
            .then((res) => {
                setTasks(res.data.tasks)
                toast.success("Task Edited SuccessFully")
                setEdit(false)
                setData({ task: "" })
            })
            .catch((e) => {
                toast.error(e.response.data.message)
                setEdit(false)
            })
    }


    return (
        <>
            <NavBar />
            <section class="vh-100 gradient-custom-2">
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="pb-2">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex flex-row align-items-center">
                                        <input type="text" class="form-control form-control-lg"
                                            placeholder="Add new..." value={data.task} name="task" onChange={(e) => handleChange(e)} />
                                        <div>
                                            {!edit ? (<button type="button" class="btn btn-primary" onClick={handleAddTask}>Add</button>) :
                                                (<button type="button" class="btn btn-success" onClick={SubmitEditTask}>Edit</button>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 col-xl-30">

                            <div class="card mask-custom">
                                <div class="card-body p-4 text-white">

                                    <div class="text-center pt-3 pb-2">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                                            alt="Check" width="60" />
                                        <h2 class="my-4">Task List</h2>
                                    </div>
                                    <PerfectScrollbar style={{ height: '300px' }}>

                                        <table class="table text-white mb-0" >
                                            <thead>
                                                <tr>
                                                    <th>S.No#</th>
                                                    <th scope="col">Created <i class="fas fa-calendar-days fa-lg me-3"></i></th>
                                                    <th scope="col">Created <i class="fas fa-clock fa-lg me-3"></i></th>
                                                    <th scope="col">Completed <i class="fas fa-calendar-days fa-lg me-3"></i></th>
                                                    <th scope="col">Completed <i class="fas fa-clock fa-lg me-3"></i></th>
                                                    <th scope="col">Task</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tasks?.map((task, idx) => (
                                                    <tr class="fw-normal" key={task._id}>
                                                        <th>
                                                            <span class="ms-2">#{idx+1}</span>
                                                        </th>
                                                        <th>
                                                            <span class="ms-2">{formatDate(task.createdAt)}</span>
                                                        </th>
                                                        <th>
                                                            <span class="ms-2">{formatTime(task.createdAt)}</span>
                                                        </th>
                                                        <th>
                                                            <span class="ms-2">{task.status !== "Completed"?"---":formatDate(task.updatedAt)}</span>
                                                        </th>
                                                        <th>
                                                            <span class="ms-2">{task.status !== "Completed"?"---":formatTime(task.updatedAt)}</span>
                                                        </th>
                                                        <td class="align-middle">
                                                            <span>{task.task}</span>
                                                        </td>
                                                        <td class="align-middle">
                                                            <h6 class="mb-0"><span class={task.status === "Completed" ? "badge bg-success" : "badge bg-warning"}>{task.status}</span></h6>
                                                        </td>
                                                        <td class="align-middle" >
                                                            {task.status === "Pending" ? (<span data-mdb-toggle="tooltip" title="Done" style={{ cursor: "pointer", marginRight: "10px" }} onClick={() => handleTaskComp(task._id , "Completed")}><i
                                                                class="fas fa-check fa-lg text-success me-3"></i></span>) :
                                                                (<span data-mdb-toggle="tooltip" title="Retry" style={{ cursor: "pointer", marginRight: "10px" }} onClick={() => handleTaskComp(task._id , "Pending")}><i
                                                                    class="fas fa-clock-rotate-left fa-lg text-warning me-3"></i></span>)}

                                                            <span style={{ cursor: "pointer", marginRight: "10px" }} data-mdb-toggle="tooltip" title="Edit" onClick={() => handleEditTask(task._id, task.task)}><i
                                                                class="fa-regular fa-pen-to-square fa-lg" style={{color:"cyan"}}></i></span>
                                                            <span onClick={() => handleDeleteTask(task._id)} style={{ cursor: "pointer" }} data-mdb-toggle="tooltip" title="Remove"><i
                                                                class="fas fa-trash-alt fa-lg text-danger"></i></span>
                                                        </td>
                                                    </tr>
                                                ))}





                                            </tbody>
                                        </table>

                                    </PerfectScrollbar>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}

export default Tasks