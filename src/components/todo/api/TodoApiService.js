import axios from "axios"


const apiClient = axios.create(
{
    baseURL: "http://localhost:8080"
}
)

export const retrieveAllTodosForUserName = (userName) => apiClient.get(`/users/${userName}/todos`)