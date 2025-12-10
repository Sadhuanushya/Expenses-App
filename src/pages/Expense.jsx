import { useSelector } from "react-redux"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchaddExpensedata } from "../slice/Expense-slice";
export default function Expense(){
    const dispatch =useDispatch()
    const [form,setForm]=useState({
        title:"",
        ExpenseDate:"",
        amount:0,
        category:"",
        description:""
})
    const {data}=useSelector((state)=>{
        return state.category;
    })
    console.log("data",data)
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("form",form)
        dispatch(fetchaddExpensedata(form))
        
    }
    return(
        <>
        <h2>Add Expenses-{data.length}</h2>
        <form>
        <input type="text" value={form.title} name="title" placeholder="enter title" onChange={handleChange}
        /><br/>
        <input type="Date" value={form.ExpenseDate} name="ExpenseDate" onChange={handleChange}  /><br/>
        <input type="number"  value={form.amount} name="amount" onChange={handleChange} placeholder="enter amount"/><br/>
        <select value={form.category} name="category" onChange={handleChange}>
            <option value="">select category</option>
            {data.map(ele=>{
                return <option key={ele._id} value={ele._id}>{ele.name}</option>
            })}
        </select><br/>
        <input type="text" value={form.description} name="description" placeholder="enter description" onChange={handleChange}/><br/>
        <button onClick={handleSubmit}>submit</button>
        </form>

        </>
        
    )
}