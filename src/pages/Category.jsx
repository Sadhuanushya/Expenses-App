import CategoryList from "./CategoryList"
import { useSelector } from "react-redux"
export default function Category(){
  const {data}=useSelector((state)=>{
    return state.category
  })
  return(
    <>
    <h2>Listing category-{data.length}</h2>
   <CategoryList/>
          </>
  )}

























// import { useFormik } from "formik";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Category() {
//   const [listCategory, setlistCategory] = useState([]);
//   const [editId, setEditId] = useState(null);

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//     },
//     onSubmit: (values, { resetForm }) => {
//       console.log("val", values);
//       if (editId) {
//         handleEditCategory(values, resetForm, editId);
//         setEditId(null);
//       } else {
//         handleAddCategory(values, resetForm);
//       }
//     },
//   });

//   useEffect(() => {
//     const ListCategory = async () => {
//       try {
//         const response = await axios.get("http://localhost:3080/categories", {
//           headers: { Authorization: localStorage.getItem("token") },
//         });
//         console.log("list category", response.data);
//         setlistCategory(response.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     ListCategory();
//   }, []);

//   const handleAddCategory = async (formData, resetForm) => {
//     try {
//       console.log("add functionality working");
//       const response = await axios.post(
//         "http://localhost:3080/category",
//         formData,
//         { headers: { Authorization: localStorage.getItem("token") } }
//       );
//       console.log("add category", response.data);
//       setlistCategory([...listCategory, response.data]);
//       resetForm();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleRemoveCategory = async (id) => {
//     const confirmDelete = window.confirm("Are you sure to delete category?");
//     if (confirmDelete) {
//       try {
//         const response = await axios.delete(
//           `http://localhost:3080/category/${id}`,
//           { headers: { Authorization: localStorage.getItem("token") } }
//         );
//         console.log(response.data);
//         const result = listCategory.filter((ele) => ele._id !== id);
//         setlistCategory(result);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };

//   const handleEditCategory = async (formData, resetForm, id) => {
//     try {
//       console.log("editing function working");
//       const response = await axios.put(
//         `http://localhost:3080/category/${id}`,
//         formData,
//         { headers: { Authorization: localStorage.getItem("token") } }
//       );
//       console.log("edit category new", response.data);

//       const updatedList = listCategory.map((ele) =>
//         ele._id === id ? { ...ele, name: response.data.name } : ele
//       );
//       setlistCategory(updatedList);
//       alert("updated successfully");
//       resetForm();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div>
//       <h2>Categories</h2>
//       {editId ? <h3>Edit Category</h3> : <h3>Add Category</h3>}

//       <form onSubmit={formik.handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           value={formik.values.name}
//           onChange={formik.handleChange}
//           placeholder="enter category"
//         />
//         <br />
//         <br />
//         <input type="submit" />
//       </form>

//       <h3>Listing categories - {listCategory.length}</h3>

//       <table border="1">
//         <thead>
//           <tr>
//             <th>Category</th>
//             <th>Update</th>
//             <th>Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//           {listCategory.map((ele) => (
//             <tr key={ele._id}>
//               <td>{ele.name}</td>
//               <td>
//                 <button
//                   onClick={() => {
//                     formik.setValues({ name: ele.name });
//                     setEditId(ele._id);
//                   }}
//                 >
//                   Edit
//                 </button>
//               </td>
//               <td>
//                 <button onClick={() => handleRemoveCategory(ele._id)}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
