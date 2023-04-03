import { useEffect, useState } from "react"
import { deleteTodoApi, retrieveAllTodosForUserName } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useNavigate } from "react-router-dom"

function ListTodosComponent() {
    const authContext = useAuth()
    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()

    //need to load the data as soon as the component refreshed. So, it will be

    useEffect(() => {refreshTodos()},[])  //this [] is done to make sure the data is not refreshed everytime without a need

    function refreshTodos() {
        retrieveAllTodosForUserName(authContext.userName).then((todos) => setTodos(todos.data))
            .catch((error) => console.log(error))
    }

    function deleteTodo(id){
        deleteTodoApi(authContext.userName, id).then(
            () =>{
                setMessage(`Delete of todo with id = ${id} is success`)
                refreshTodos();
            }

        ).catch((error) => console.log(error))
    }

    function updateTodo(id){
        navigate(`/todo/${id}`)
    }


    function addNewTodo(){
        navigate(`/todo/-1`)
    }

    return (
        <div className="container">
            <h1>Things you want to do!</h1>
           {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Done?</th>
                            <th>Target Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map((todo) => (
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                    <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                    <td><button className="btn btn-success" onClick={() => updateTodo(todo.id)}>Update</button></td>
                                </tr>
                            )
                            )
                        }

                    </tbody>
                </table>

            </div>
            <div className="btn btn-success m-5" onClick={() => addNewTodo()}>Add New Todo</div>
        </div>
    )
}

export default ListTodosComponent