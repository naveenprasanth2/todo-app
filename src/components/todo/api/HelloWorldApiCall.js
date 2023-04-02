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
export const retrieveHelloWorldPathVariable = (userName) => apiClient.get(`/hello-world/path-variable/${userName}`)