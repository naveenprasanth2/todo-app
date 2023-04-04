import { apiClient } from "./ApiClient"

export const retrieveAllTodosForUserName = (userName) => apiClient.get(`/users/${userName}/todos`)

export const deleteTodoApi = (userName, id) => apiClient.delete(`/users/${userName}/todos/${id}`)

export const retrieveTodoApi = (userName, id) => apiClient.get(`/users/${userName}/todos/${id}`)

export const updateTodoApi = (userName, id, todo) => apiClient.put(`/users/${userName}/todos/${id}`, todo)

export const createTodoApi = (userName, todo) => apiClient.post(`/users/${userName}/todos`, todo)