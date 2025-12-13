import { useContext,useEffect } from "react"
import {fetchUserCategory} from "../slice/Category-slice";
import {fetchExpensedata} from "../slice/Expense-slice"
import { useDispatch,useSelector } from "react-redux"
import UserContext from "../context/UserContext"
export default function DashBoard(){
    const dispatch=useDispatch()
    const {user} =useContext(UserContext)
    const {data,loading,errors}=useSelector((state)=>{
        return state.category
    })
    const {data:Expensedata}=useSelector((state)=>{
        return state.Expense;
    })
    // const [category,Expense]=useSelector((state)=>{
    //     return [state.category,state.Expense]
    // })


    if(!user){
        return(<p>Loading!!!</p>)
    }
    return(
        <>
        
        <h2>welcome to DashBoard</h2>
        <p>Welcome {user.username}!! -{user.role}</p>
        {loading && <p>loading..</p>}
        {errors && <p>{errors}</p>}
        <p>category-{data.length}</p>
        <p>expense-{Expensedata.length}</p>
        </>
    )
}
