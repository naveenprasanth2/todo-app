import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./security/AuthContext"

function LoginComponent() {

    const [userName, setUsername] = useState('in28minutes')
    const [password, setPassword] = useState()
    const [showFailedMessage, setShowFailedMessage] = useState(false)
    const navigate = useNavigate()
    const authContext = useAuth()

    function handleUserNameChange(event) {
        setUsername(event.target.value)
    }

    function handlePassword(event) {
        setPassword(event.target.value)

    }

    //the below method is made as async bcoz, the related used methods needs this method to wait till a response is obtained
    async function handleSubmit() {
        if(await authContext.login(userName, password)){
            navigate(`/welcome/${userName}`)
        }else{
            setShowFailedMessage(true)
        }
    }

    return (
        <>
            <div className="login">
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