import axios from "axios";
import {useState,useEffect} from "react"
import UserContext from "../context/UserContext";
import  {useContext} from "react";
export default function UserList(){
    const {user}=useContext(UserContext);
    const [users,setusers]=useState([])

    useEffect(()=>{
        const ListUsers=async()=>{
         try{
           const response=await axios.get('http://localhost:3080/users',{headers:{Authorization:localStorage.getItem('token')}})
           console.log(response.data)
           setusers(response.data)
        }catch(err){
            console.log(err)
        }
        }
        ListUsers();

    },[])
    const handleRemove=(id,email)=>{
        const confirm=window.confirm("are you sure to remove")
         console.log("id",id)
        if(confirm){
            const confirmPrompt=window.prompt('enter your email')
            if(confirmPrompt==email){
                const removeUsers=async()=>{
                try{
                    const response=await axios.delete(`http://localhost:3080/users/${id}`,{headers:{Authorization:localStorage.getItem('token')}})
                    console.log(response.data)
                    setusers(users.filter(ele=>{
                        return(ele._id!=response.data._id)
                    }))

                }catch(err){
                    console.log(err)
                }
             }
             removeUsers();
            }  
        
        }         
    }
    return(
        <>
        <h2>Users List</h2>
        <table border="1">

                <th>username</th>
                <th>email</th>
                <th>role</th> 
                <th>Action</th>
               
                   {users.map(ele=>{
                    return <>
                    <tr key={ele._id}>
                        <td>{ele.username}</td>
                        <td>{ele.email}</td>
                        <td>{ele.role}</td>
                    {user._id!== ele._id && <button onClick={() => {
                        handleRemove(ele._id,ele.email)
                    }}>remove</button>}
                    
                    </tr>
</>
                   })}

        </table>
        </>
    )
}