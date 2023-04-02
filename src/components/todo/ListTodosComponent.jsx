import { useEffect, useState } from "react"
import { retrieveAllTodosForUserName } from "./api/TodoApiService"

function ListTodosComponent() {

    const [todos, setTodos] = useState([])

    //need to load the data as soon as the component refreshed. So, it will be

    useEffect(
        () => {
            refreshTodos()
        }, []  //this [] is done to make sure the data is not refreshed everytime without a need
    )

    function refreshTodos() {
        retrieveAllTodosForUserName("in28minutes").then((todos) => setTodos(todos.data))
            .catch((error) => console.log(error))
    }
    return (
        <div className="container">
            <h1>Things you want to do</h1>
            <div>

                <table className="table">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Description</td>
                            <td>Is Done?</td>
                            <td>Target Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map((todo) => (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                </tr>
                            )
                            )
                        }

                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default ListTodosComponent