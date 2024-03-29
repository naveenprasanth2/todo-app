import axios from "axios"


const apiClient = axios.create(
{
    baseURL: "http://localhost:8080"
}
)
export function retrieveHelloWorldBean() {
    return apiClient.get("/hello-world-bean")
}

//most effective and common way of calling the above function
//by default we need to pass headers as a part of request
export const retrieveHelloWorldPathVariable = (userName, token) => apiClient.get(`/hello-world/path-variable/${userName}`, {
    headers:{
        Authorization: token,
    }
})


export const executeBasicAuthenticationService = (token) => apiClient.get("/basicauth", {
    headers: {
        Authorization: token
    }
})