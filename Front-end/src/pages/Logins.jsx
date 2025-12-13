import {useFormik} from 'formik'
import UserContext from '../context/UserContext'

import { useContext } from 'react'
export default function Logins(){
    const {handleLogin,serverErrors}=useContext(UserContext)
    const formik=useFormik({
       initialValues:{
        email:'',
        password:''

       },
    onSubmit:(values,{resetForm})=>{
     console.log(values)
     handleLogin(values,resetForm)
    }
,})
    
    return(
        <>
       <h2>Login with us</h2>
       {serverErrors && <p >{serverErrors}</p>}
       
        <form onSubmit={formik.handleSubmit}>
        
            <div>
                <input type='text' name='email' value={formik.values.email} onChange={formik.handleChange} placeholder='enter email'/>
            </div>
            <div>
                <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange} placeholder='enter password'/>
            </div>
            <input type="submit" value="Login"/>
        </form >
        </>

    )
}
