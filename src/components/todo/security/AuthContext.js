import { createContext, useContext, useState } from "react";
import { executeBasicAuthenticationService } from "../api/HelloWorldApiCall";


//1. create a context
export const AuthContext = createContext()

//creaing a usercontext and then exporting it as its followed as standard
export const useAuth = () => useContext(AuthContext)
//2. share the created context with other components

export default function AuthProvider({ children }) {
    //put some state in context
    const [number, setNumber] = useState(10)
    const [isAuthenticated, setAuthenticated] = useState()
    const [userName, setUserName] = useState(null)
    const [token, setToken] = useState(null)
    //the below line has variables and methods so that it can help in manipulating the value outside of the class
    return (
        <AuthContext.Provider value={{ number, setNumber, isAuthenticated, setAuthenticated, login, logout, userName, token }}>
            {children}
        </AuthContext.Provider>
    )

    // function login(userName, password) {
    //     if (userName === 'in28minutes' && password === 'dummy') {
    //         setAuthenticated(true)
    //         setUserName(userName)
    //         return true
    //     } else {
    //         setAuthenticated(false)
    //         return false
    //     }
    // }

    async function login(userName, password) {

        const baToken = 'Basic ' + window.btoa(userName + ":" + password)

        // the below line is a promise, this will wait for response to come back, but the next lines of code will execute though
        // the above lines are not executed. Hence, use await along with async
        const response = await executeBasicAuthenticationService(baToken)

        try {
            if (response.status == 200) {
                setAuthenticated(true)
                setToken(baToken)
                setUserName(userName)
                return true
            } else {
                logout()
                return false
            }
        } catch (error) {
            logout()
            return false
        }
    }


    function logout() {
        setAuthenticated(false)
        setToken(null)
        setUserName(null)
    }
}

