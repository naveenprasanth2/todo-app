import { useState } from "react"
import "./TodoApp.css"
import { BrowserRouter, Route, Routes, useNavigate, useParams } from "react-router-dom"

export default function TodoApp() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginComponent />} />
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/welcome/:userName" element={<WelcomeComponent />} />
                    <Route path="/todos" element={<ListTodosComponent />} />
                    <Route path="*" element={<ErrorComponent />} />
                </Routes>
            </BrowserRouter>

            {/* <WelcomeComponent/> */}
        </>
    )
}

function LoginComponent() {

    const [userName, setUsername] = useState('in28minutes')
    const [password, setPassword] = useState()
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showFailedMessage, setShowFailedMessage] = useState(false)
    const navigate = useNavigate()

    function handleUserNameChange(event) {
        setUsername(event.target.value)
    }

    function handlePassword(event) {
        setPassword(event.target.value)

    }

    function handleSubmit() {
        if (userName === 'in28minutes' && password === 'dummy') {
            setShowSuccessMessage(true)
            setShowFailedMessage(false)
            navigate(`/welcome/${userName}`)
        } else {
            setShowSuccessMessage(false)
            setShowFailedMessage(true)
        }

    }

    return (
        <>
            <div className="login">
                {showSuccessMessage && <div className="successMessage" >Authenticated Successfully</div>}
                {showFailedMessage && <div className="errorMessage">Authentication Failed. Please check your credentials</div>}
                <div className="LoginForm">
                    <div><label>User Name:</label>
                        <input type={"text"} name='userName' value={userName} onChange={handleUserNameChange}></input>
                    </div>
                    <div><label>Password:</label>
                        <input type={"password"} name='password' onChange={handlePassword}></input>
                    </div>
                    <div><button type="button" name="login" onClick={handleSubmit}>login</button></div>
                </div>
            </div>
        </>
    )
}

function WelcomeComponent() {
    const { userName } = useParams()
    return (
        <>
            <h1>Welcome {userName}</h1>
            <div className="Welcome">Welcome Component</div>
        </>
    )
}

function ErrorComponent() {
    return (
        <div className="errorComponent">
            <h1>We are working really hard</h1>
            <div>Appologies for the inconvinience caused.</div>
            <div>Please reachout to the help desk for further queries</div>
        </div>
    )
}

function ListTodosComponent() {

    const todos = [{ id: 1, description: 'Learn AWS' },
                    { id: 2, description: 'Learn Full Stack dev' },
                    { id: 3, description: 'Learn DevOps' }
                    ]

    return (
        <div className="todosComponent">
            <h1>Things you want to do</h1>
            <div>

                <table>
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>description</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{todos[0].id}</td>
                            <td>{todos[0].description}</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    )
}