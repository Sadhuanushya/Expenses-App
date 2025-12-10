import ExpenseTable from "./ExpenseTable"
import Expense from "./Expense"
export default function ExpenseContainer(){
    return(
        <>
          <Expense/>
        <h2>Listing Expenses</h2>
        <ExpenseTable/>
        </>
    )
}