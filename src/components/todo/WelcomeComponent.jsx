import { Link, useParams } from "react-router-dom"
import { useState } from "react"
import { retrieveHelloWorldPathVariable } from "./api/HelloWorldApiCall"
import { useAuth } from "./security/AuthContext"

function WelcomeComponent() {
    const [message, setMessage] = useState(null)
    const authContext = useAuth()

    function callHelloWorldRestApi(){        
        retrieveHelloWorldPathVariable("ranga")
        .then((response) => successfulResponse(response))
        .catch((error) => errorResponse(error))
        .finally(() => console.log('cleanup'))
    }

    function successfulResponse(response){
        setMessage(response.data.message)
        console.log(response.data.message)
    }

    function errorResponse(error){
        console.log(error)
    }

    const { userName } = useParams()
    return (
        <>
            <h1>Welcome {userName}</h1>
            <div className="Welcome">Manage your todos - <Link to="/todos">Go Here</Link></div>
            <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>Call Hello World</button>
            <div className="test-info">{message}</div>
        </>
    )
}

export default WelcomeComponent