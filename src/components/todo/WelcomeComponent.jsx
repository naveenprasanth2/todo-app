import { Link, useParams } from "react-router-dom"

function WelcomeComponent() {
    const { userName } = useParams()
    return (
        <>
            <h1>Welcome {userName}</h1>
            <div className="Welcome">Manage your todos - <Link to="/todos">Go Here</Link></div>
        </>
    )
}

export default WelcomeComponent