import "./TodoApp.css"
import LogoutComponent from "./LogoutComponent"
import FooterComponent from "./FooterComponent"
import HeaderComponent from "./HeaderComponent"
import WelcomeComponent from "./WelcomeComponent"
import LoginComponent from "./LoginComponent"
import ErrorComponent from "./ErrorComponent"
import ListTodosComponent from "./ListTodosComponent"
import AuthProvider, { useAuth } from "./security/AuthContext"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"


function AuthenticatedRoute({children}) {
    const authContext = useAuth()
    
    if(authContext.isAuthenticated){
        return children
    }else{
        return <Navigate to="/"/>
    }
}

export default function TodoApp() {
    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path="/" element={<LoginComponent />} />
                        <Route path="/login" element={<LoginComponent />} />

                        <Route path="/welcome/:userName" element={
                            <AuthenticatedRoute>
                                <WelcomeComponent />
                            </AuthenticatedRoute>
                        } />
                        <Route path="/todos" element={<AuthenticatedRoute><ListTodosComponent /></AuthenticatedRoute>} />
                        <Route path="/logout" element={<AuthenticatedRoute><LogoutComponent /></AuthenticatedRoute>} />

                        <Route path="*" element={<ErrorComponent />} />
                    </Routes>
                    <FooterComponent />
                </BrowserRouter>
            </AuthProvider>
        </>
    )
}