import { useEffect, useReducer } from "react"
import UserContext from "../context/UserContext"
import axios from 'axios';
import {useNavigate} from "react-router-dom"

const userReducer=(state,action)=>{
    console.log("state",state)
    
    switch(action.type){
        case "LOG_IN":{
            return{...state,isLoggedIn:true,user:action.payload,serverErrors:''}
        }
        case "LOG_OUT":{
            return{...state,isLoggedIn:false,user:null}
        }
        case "SET_SERVER_ERRORS":{
            return{...state,serverErrors:action.payload}
        }case "LIST_CATEGORY":{
            return{...state,category:action.payload}
        }
        case "ADD_CATEGORY":{
            return{...state,category:action.payload}
        }
        case "UPDATE_CATEGORY":{
            return {...state,category: state.category.length >0 &&  state.category.map(ele =>
          ele._id === action.payload._id ? { ...ele, name: action.payload.name } : ele
        )
      };
        }
        default:{
            return{...state}
        }
    }
}
export default function AuthProvider(props){
    const navigate = useNavigate();
    //state
    const [userState,userDispatch]=useReducer(userReducer,{
        user:null,
        isLoggedIn:false,
        serverErrors:'',
        category:[]
    })
    useEffect(()=>{
    
       if(localStorage.getItem('token')){
        const fetchUser=async()=>{
            try{
                const res=await axios.get('http://localhost:3080/users/account',{headers:{Authorization:localStorage.getItem('token')}})
                userDispatch({type:"LOG_IN",payload:res.data})
            }catch(err){
                console.log(err)
            }  
        }
        fetchUser();
       }
    },[])

// useEffect(()=>{
   
//  const ListCategory=async()=>{
//          try{
//              const response=await axios.get('http://localhost:3080/categories',{headers:{Authorization:localStorage.getItem('token')}})
//              console.log("list category",response.data)
//              userDispatch({type:"LIST_CATEGORY",payload:response.data})
//         }catch(err){
//              console.log(err)
//         }
//     }
//  ListCategory();

// },[])

    //functionality
    const handleRegister=async(FormData,resetForm)=>{
        try{
            const response=await axios.post('http://localhost:3080/users/register',FormData)
            console.log("response",response.data)
            alert('successfully registered')
            resetForm();
            navigate('/login')
        }catch(err){
            console.log("error",err)
        }
    }
    // const handleLogin = async (formData, resetForm) => {
    //     try {
    //         const response = await axios.post('/users/login', formData);
    //         localStorage.setItem('token', response.data.token);
    //         const userResponse = await axios.get('/users/account', { headers: { Authorization: localStorage.getItem('token')}});
    //         // console.log(userResponse.data)
    //         alert('successfully logged in');
    //         resetForm();
    //         dispatch({ type: "LOGIN", payload: userResponse.data });
    //         navigate('/dashboard');
    //     } catch(err) {
    //         // console.log(err);
    //         dispatch({ type: "SET_SERVER_ERRORS", payload: err.response.data.error });
    //     }
    // }
    const handleLogin=async(formData,resetForm)=>{
     try{
            const response=await axios.post('http://localhost:3080/users/login',formData)
            localStorage.setItem('token',response.data.token)
            const userResponse=await axios.get('http://localhost:3080/users/account',{headers:{Authorization:localStorage.getItem('token')}})
            userDispatch({type:"LOG_IN",payload:userResponse.data})
            console.log("response",response.data)
            alert('successfully login')
            resetForm();
            navigate('/dashBoard')
        }catch(err){
            console.log("error",err.response.data.error)
            userDispatch({type:"SET_SERVER_ERRORS",payload:err.response.data.error})
        }
    }
    


    const handleLogout=async()=>{
        localStorage.removeItem('token')
        userDispatch({type:"LOG_OUT"})
        navigate('/')
    }
    return(
        <>
          
      
        <UserContext.Provider value={{...userState,handleRegister,handleLogin,handleLogout}}>
                {props.children}
        </UserContext.Provider>
        </>

    )
}