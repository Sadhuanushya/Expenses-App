import {useFormik} from 'formik'
import UserContext from '../context/UserContext'

import { useContext } from 'react'
export default function Register(){
    const {handleRegister}=useContext(UserContext)
    const formik=useFormik({
       initialValues:{
      username:'',
        email:'',
        password:''

       },
    onSubmit:(values,{resetForm})=>{
     console.log("values",values)
     handleRegister(values,resetForm)
    }
,})
    
    return(
        <>
       <h2>Register Component</h2>
        <form onSubmit={formik.handleSubmit}>
            <div>
                <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} placeholder='enter username'/>
            </div>
            <div>
                <input type='text' name='email' value={formik.values.email} onChange={formik.handleChange} placeholder='enter email'/>
            </div>
            <div>
                <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange} placeholder='enter password'/>
            </div>
            <input type="submit" value="register"/>
        </form >
        </>

    )
}
