import { createContext, useContext, useState } from "react";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";


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

    async function login(userName, password) {

        // const baToken = 'Basic ' + window.btoa(userName + ":" + password)

        // the below line is a promise, this will wait for response to come back, but the next lines of code will execute though
        // the above lines are not executed. Hence, use await along with async
        const response = await executeJwtAuthenticationService(userName, password)
        console.log(response)
        try {
            if (response.status == 200) {
                const jwtToken = 'Bearer '+ response.data.token
                setAuthenticated(true)
                setUserName(userName)
                setToken(jwtToken)

                //this line will help in adding the token for all the requests
                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )

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

