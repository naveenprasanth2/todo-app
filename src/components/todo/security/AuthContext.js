import { createContext, useContext, useState } from "react";


//1. create a context
export const AuthContext = createContext()

//creaing a usecontext and then exporting it as its followed as standard
export const useAuth = () => useContext(AuthContext)
//2. share the created context with other components

export default function AuthProvider({ children }) {
    //put some state in context
    const [number, setNumber] = useState(10)
    setInterval(() => setNumber(number + 1), 10000)
    return (
        <AuthContext.Provider value={{ number }}>
            {children}
        </AuthContext.Provider>
    )
}