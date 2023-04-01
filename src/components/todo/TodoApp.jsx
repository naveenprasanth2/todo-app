import { useState } from "react"
import "./TodoApp.css"
import { BrowserRouter, Link, Route, Routes, useNavigate, useParams } from "react-router-dom"

export default function TodoApp() {
    return (
        <>
            <BrowserRouter>
            <HeaderComponent />
                <Routes>
                    <Route path="/" element={<LoginComponent />} />
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/welcome/:userName" element={<WelcomeComponent />} />
                    <Route path="/todos" element={<ListTodosComponent />} />
                    <Route path="/logout" element={<LogoutComponent />} />
                    <Route path="*" element={<ErrorComponent />} />
                </Routes>
                <FooterComponent />
            </BrowserRouter>
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
            <div className="Welcome">Manage your todos - <Link to="/todos">Go Here</Link></div>
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

    const today = new Date()
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay())


    const todos = [{ id: 1, description: 'Learn AWS', done: false, targetDate: targetDate },
    { id: 2, description: 'Learn Full Stack dev', done: false, targetDate: targetDate },
    { id: 3, description: 'Learn DevOps', done: false, targetDate: targetDate }
    ]

    return (
        <div className="container">
            <h1>Things you want to do</h1>
            <div>

                <table className="table">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Description</td>
                            <td>Is Done?</td>
                            <td>Target Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map((todo) => (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toDateString()}</td>
                                </tr>
                            )
                            )
                        }

                    </tbody>
                </table>

            </div>
        </div>
    )
}

function HeaderComponent() {
    return (
        <header className="border-bottom border-light border-5 mb-5 p-2">
        <div className="container">
            <div className="row">
                <nav className="navbar navbar-expand-lg">
                    <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="https://www.in28minutes.com">in28minutes</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5"><Link className="nav-link" to="/welcome/in28minutes">Home</Link></li>
                            <li className="nav-item fs-5"><Link className="nav-link" to="/todos">Todos</Link></li>
                        </ul>
                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-item fs-5"><Link className="nav-link" to="/login">Login</Link></li>
                        <li className="nav-item fs-5"><Link className="nav-link" to="/logout">Logout</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>

    )
}

function FooterComponent() {
    return (
        <footer className="footer">
            <div className="container">
                Your Footer
            </div>
        </footer>
    )
}

function LogoutComponent() {
    return (
        <div className="logoutComponent">
            <h1>You are logged out!!!</h1>
            <div>Thank you for using our app, come back soon!!!</div>
        </div>
    )
}