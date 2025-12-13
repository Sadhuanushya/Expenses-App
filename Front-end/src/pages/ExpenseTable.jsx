import { useSelector } from "react-redux"
import{format} from "date-fns"
import { deleteExpense } from "../slice/Expense-slice";
import { useDispatch } from "react-redux";
export default function ExpenseTable(){
const dispatch=useDispatch()
const {data} =useSelector((state)=>{
    return state.Expense;
})
const CategoryData=useSelector((state)=>{
    return state.category.data;
})
const handleDelete=(id)=>{
    console.log("delete function calling",id)
    dispatch(deleteExpense(id))

}
    return(
        <>
     
        <table border="1">
            <thead>
                <tr>
                <th>#</th>
                <th>title</th>
                <th>ExpenseDate</th>
                <th>amount</th>
                <th>category</th>
                <th>update</th>
                <th>delete</th>
                </tr>
            </thead>
            <tbody>
                {data.map((exp,i)=>{
                    return <tr key={i}>
                        <td>{i+1}</td>
                        <td>{exp.title}</td>
                        <td>{format(new Date(exp.ExpenseDate),"dd/mm/yyyy")}</td>
                        <td>{exp.amount}</td>
                        <td>{CategoryData.find(cat=>cat._id==exp.category)?.name}</td>
                        <td><button>Edit</button></td>
                        <td><button onClick={()=>{
                        handleDelete(exp._id)}}>Delete</button></td>
                    </tr>
                })}
            </tbody>
        </table>
        </>
    )
}