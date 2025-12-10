import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"
export const fetchExpensedata=createAsyncThunk("Expense/fetchExpensedata",
    async(undefined,{rejectWithValue})=>{
        try{
            const response=await axios.get("http://localhost:3080/expenses",{headers:{Authorization:localStorage.getItem("token")}})
            console.log("expenseData",response.data)
            return response.data
        }catch(err){
            return rejectWithValue(err.message)
        }
}
)
export const fetchaddExpensedata=createAsyncThunk("Expense/fetchaddExpensedata",
    async(form,{rejectWithValue})=>{
        try{

            const response=await axios.post("http://localhost:3080/expense",form,{headers:{Authorization:localStorage.getItem("token")}})
            console.log("expenseAddedData",response.data)
            return response.data
        }catch(err){
            return rejectWithValue(err.message)
        }
}
)
export const deleteExpense=createAsyncThunk("Expense/DeleteExpense",async(id,{rejectWithValue})=>{
    try{
        const response=await axios.delete(`http://localhost:3080/expense/${id}`,{headers:{Authorization:localStorage.getItem("token")}})
        console.log("deleted data",response.data.expense)
        return response.data.expense
    }catch(err){
        return rejectWithValue(err.message)
    }
})
const ExpenseSlice=createSlice({
    name:"Expense",
    initialState:{
        data:[],
        loading:false,
        errors:null
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchExpensedata.pending,(state)=>{
            state.data=[]
            state.loading=true
            state.errors=null
        })
        .addCase(fetchExpensedata.fulfilled,(state,action)=>{
             state.data=action.payload;
             state.loading=false
             state.errors=null
        })
        .addCase(fetchExpensedata.rejected,(state,action)=>{
             state.errors=action.payload
             state.data=[]
             state.loading=false
        })
        .addCase(fetchaddExpensedata.fulfilled,(state,action)=>{
             state.errors=[]
             state.data.push(action.payload)
             state.loading=false
        })
        .addCase(deleteExpense.fulfilled,(state,action)=>{
            const idx=state.data.find(ele=>ele._id==action.payload._id)
            state.data.splice(idx,1)

        })
    }
})
export default ExpenseSlice.reducer;
