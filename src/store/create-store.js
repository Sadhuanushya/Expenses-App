import { configureStore } from "@reduxjs/toolkit"
import categoryReducer from "../slice/Category-slice"
import expenseReducer from "../slice/Expense-slice"
const createStore=()=>{
    return configureStore({
    reducer:{
        category:categoryReducer,
        Expense:expenseReducer

    }  
})
}

export default createStore;