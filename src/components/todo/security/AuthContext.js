import { createContext, useContext, useState } from "react";


//1. create a context
export const AuthContext = createContext()

//creaing a usercontext and then exporting it as its followed as standard
export const useAuth = () => useContext(AuthContext)
//2. share the created context with other components

export default function AuthProvider({ children }) {
    //put some state in context
    const [number, setNumber] = useState(10)
    const [isAuthenticated, setAuthenticated] = useState()
    //the below line has variables and methods so that it can help in manipulating the value outside of the class
    return (
        <AuthContext.Provider value={{ number, setNumber, isAuthenticated, setAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

    function login(userName, password) {
        if (userName === 'in28minutes' && password === 'dummy') {
            setAuthenticated(true)
            return true
        } else {
            setAuthenticated(false)
            return false
        }
    }

    function logout(){
        setAuthenticated(false)
    }
}

