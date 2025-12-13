import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";
export const fetchUserCategory=createAsyncThunk("category/fetchUserCategory",async(undefined,{rejectWithValue})=>{
    try{
        const response= await axios.get("http://localhost:3080/categories",{headers:{Authorization:localStorage.getItem("token")}})
        console.log("categoryResponse",response.data)
        return response.data
    }catch(err){
        return rejectWithValue(err.message)
    }
})
export const fetchUserAddCategory=createAsyncThunk("categorys/fetchUserAddCategory",async(FormData,{rejectWithValue})=>{
    try{
        const response= await axios.post("http://localhost:3080/category",FormData,{headers:{Authorization:localStorage.getItem("token")}})
        console.log("categoryaddResponse",response.data)
        return response.data
    }catch(err){
        return rejectWithValue(err.message)
    }
})
export const fetchUserRemoveCategory=createAsyncThunk("categorys/fetchUserRemoveCategory",async(id,{rejectWithValue})=>{
    try{
        const response= await axios.delete(`http://localhost:3080/category/${id}`,{headers:{Authorization:localStorage.getItem("token")}})
        console.log("categoryRemoveResponse",response.data)
        return response.data
    }catch(err){
        console.log(ert)
        return rejectWithValue(err.message)
    }
})
export const fetchUserUpdateCategory=createAsyncThunk("categorys/fetchUserUpdateCategory",async({editId,FormData},{rejectWithValue})=>{
    try{
        const response= await axios.put(`http://localhost:3080/category/${editId}`,FormData,{headers:{Authorization:localStorage.getItem("token")}})
        console.log("categoryRemoveResponse",response.data)
        return response.data
    }catch(err){
        console.log(ert)
        return rejectWithValue(err.message)
    }
})
const categorySlice =createSlice({
    name:"category",
    initialState:{
        data:[],
        errors:null,
        loading:false,
        editId:null
    },
    reducers:{
        resetCategory:(state)=>{
            state.data=[],
            state.errors=null,
            state.loading=false
        },
        assignEditID:(state,action)=>{
            state.editId=action.payload
        },
        resetEditId:(state,action)=>{
            state.editId=null
        }

    },
extraReducers:(builder)=>{
builder
.addCase(fetchUserCategory.pending,(state)=>{
    state.data=[]
    state.errors=null
    state.loading=true
})
.addCase(fetchUserCategory.fulfilled,(state,action)=>{
    state.data=action.payload
    state.errors=null
    state.loading=false
})
.addCase(fetchUserCategory.rejected,(state,action)=>{
    state.data=[]
    state.errors=action.payload
    state.loading=false
})
.addCase(fetchUserAddCategory.fulfilled,(state,action)=>{
    state.data.push(action.payload)
    state.errors=null
    state.loading=false
})
.addCase(fetchUserRemoveCategory.fulfilled,(state,action)=>{
    state.errors=null
    state.loading=false
    const idx=state.data.findIndex(ele=>ele._id==action.payload._id)
    state.data.splice(idx,1)
})
.addCase(fetchUserUpdateCategory.fulfilled,(state,action)=>{
    state.errors=null
    state.loading=false
    const idx=state.data.findIndex(ele=>ele._id==action.payload._id)
    state.data[idx]=action.payload
})
}
});
export const {resetCategory,assignEditID,resetEditId}=categorySlice.actions;
export default categorySlice.reducer;