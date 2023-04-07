import { apiClient } from "./ApiClient";

export const executeBasicAuthenticationService = (token) => apiClient.get("/basicauth"
//this is basic authentication and here token needs to be sent

, {
    headers: {
        Authorization: token
    }
}

)

export const executeJwtAuthenticationService = (userName,password) => apiClient.post(`/authenticate`,
    {userName, password},
    {
        headers:{
            "Content-Type": "application/json"
        }
    },
    console.log(password, userName)
)