import { useState } from "react"
import { useNavigate } from "react-router-dom"

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

export default LoginComponent