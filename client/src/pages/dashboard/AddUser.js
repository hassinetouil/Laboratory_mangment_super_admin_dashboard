import { useState } from 'react';
import {  FormRow, Alert } from '../../components/index';
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useAppContext } from '../../context/appContext';
const initialState = {
    name: "",
    email: "",
    password: "",
}
const AddUser = () => {
    const [values, setValues] = useState(initialState);
    const { isLoading, showAlert, displayAlert, addUser } = useAppContext()
    //global state and useNavigate
    const handleChange = (e) => { setValues({ ...values, [e.target.name]: e.target.value }) }
    const onSubmit = (e) => {
        e.preventDefault()
        const { name, email, password, lastName } = values
        if (!email || !password || !name || !lastName) {
            displayAlert()
            return
        }
        const currentUser = { name, lastName, email, password }

        addUser(currentUser)
    }
    return (<Wrapper >
        <form className='form' onSubmit={onSubmit}>
            <h3>Add User</h3>
            {showAlert && <Alert />}
            <div className="form-center">
                <FormRow type="text" name="name" value={values.name} handleChange={handleChange} />
                <FormRow labelText='last name' type='text' name='lastName' value={values.lastName} handleChange={handleChange} />
                <FormRow type="email" name="email" value={values.email} handleChange={handleChange} />
                <FormRow type="password" name="password" value={values.password} handleChange={handleChange} />
                <button type="submit" className='btn btn-block' diasabled={isLoading.toString()}>submit</button>
            </div>
        </form>
    </Wrapper>);
}

export default AddUser;