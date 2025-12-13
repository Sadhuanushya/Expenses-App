import {useState,useEffect} from "react";
import {assignEditID,resetEditId, fetchUserAddCategory,fetchUserCategory,fetchUserRemoveCategory,fetchUserUpdateCategory} from "../slice/Category-slice";
import { useDispatch,useSelector } from "react-redux"
export default function CategoryList(){
    const [name,setName]=useState("")
      const dispatch=useDispatch()
        const {data,editId}=useSelector((state)=>{
            return state.category
        })
        console.log("editId",editId)
    useEffect(()=>{
    dispatch(fetchUserCategory())
    },[dispatch])
    useEffect(()=>{
    if(editId){
      const category=data.find(ele=>ele._id==editId)
      console.log("editID",category)
      setName(category.name)
    }else{
      setName("")
    }
    },[editId])
      const handleSubmit=(e)=>{
        e.preventDefault()
        console.log("newcategoy",data)
        const FormData={
          name
        }
        if(editId){
          dispatch(fetchUserUpdateCategory({editId,FormData}))
        }else{
         dispatch(fetchUserAddCategory(FormData))
        }
        
      }
    const handleRemove=(id)=>{
    const confirm=window.confirm("are you sure to delete")
    if(confirm){
      dispatch(fetchUserRemoveCategory(id))
    }
    }
    useEffect(()=>{
      return()=>{
        dispatch(assignEditID(null))
        // dispatch(resetEditId())
    
      }
    },[])
    const handleCancel=()=>{
      dispatch(resetEditId())
    }
    return(
        <>
          <ul>{data.length >0 && (
              data.map(ele=>{
              return <li key={ele._id}>{ele.name}<button onClick={()=>{
                dispatch(assignEditID(ele._id))
              }}>edit</button><button onClick={()=>{
                handleRemove(ele._id)
              }}>remove</button>{ele._id==editId && <button onClick={handleCancel}>cancel</button>}</li>
              

})
            )}
             {editId ? <h2>edit category</h2>:<h2>add category</h2>}
            </ul>
                <div>
                <input type='text'  value={name} onChange={(e)=>{
                  setName(e.target.value)
                }} placeholder='enter category'/>

            </div>
            <button onClick={handleSubmit}>submit</button>
        </>
    )
}