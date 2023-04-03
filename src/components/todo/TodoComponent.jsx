import { useNavigate, useParams } from "react-router-dom"
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import { ErrorMessage, Field, Form, Formik } from "formik"
import moment from "moment/moment"

export default function TodoComponent() {

    const { id } = useParams()
    const authContext = useAuth()
    const userName = authContext.userName
    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')
    const navigate = useNavigate()

    useEffect(
        () => {
            retrieveTodos()
        }, [id] //should change when there is a change in id
    )

    function retrieveTodos() {
        if (id != -1) {
            retrieveTodoApi(userName, id).then((response) => {
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            }
            ).catch((error) => console.error(error))
        }
    }

    function onSubmit(values) {
        const todo = {
            id: id,
            userName: userName,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }
        console.log(todo)

        if(id==-1){
            createTodoApi(userName, todo)
            .then(() => {
                navigate("/todos")
            })
        }else{
            updateTodoApi(userName, id, todo)
            .then(() => {
                navigate("/todos")
            })
        }

    }

    function validate(values) {
        let errors = {
            //     description: 'Enter a valid decription',
            //     targetDate: 'Enter a valid target date'
        }

        if (values.description.length < 5) {
            errors.description = "Enter atleast 5 characters"
        }

        if (values.targetDate == null || values.targetDate === '' || !moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid date'
        }
        console.log(values)
        return errors
    }


    return (
        <div className="container">
            <h1>Enter Todo details</h1>
            <Formik initialValues={{ description, targetDate }}
                enableReinitialize={true} //by default formik won't do initialization
                onSubmit={onSubmit}
                validate={validate}
                validateOnChange={false} //by default it validates on any change
                validateOnBlur={false} //by default it validates on any change
            >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage name="description" component="div" className="alert alert-warning" />
                            <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field type='text' className="form-control" name='description' />
                                {/* with name field, it maps the value from formik */}
                            </fieldset>
                            <fieldset className="form-group">
                                <label>TargetDate</label>
                                <Field type='date' className="form-control" name='targetDate' />
                            </fieldset>
                            <div>
                                <button className="btn btn-success m-5" type="submit">Save</button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </div>

    )
}