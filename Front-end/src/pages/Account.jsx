import {useContext} from "react";
import UserContext from "../context/UserContext";
export default function Account(){
    const {user} =useContext(UserContext)
    if(!user){
        return(<p>Loading....</p>)
    }
    return(
        <>
        <h2>Account</h2>
        <p>Name: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>

        </>

    )
}