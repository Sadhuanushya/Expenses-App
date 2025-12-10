import {Routes ,Route,Link} from 'react-router-dom';
import { useContext,useEffect } from 'react';
import {fetchUserCategory} from "./slice/Category-slice.js";
import { fetchExpensedata } from './slice/Expense-slice.js';
import UserContext from './context/UserContext.js';
import Home from "./pages/Home.jsx";
import DashBoard from './pages/DashBoard.jsx';
import Account from './pages/Account.jsx';
import Register from './pages/Register.jsx';
import UserList from './pages/UserList.jsx';
import Category from './pages/Category.jsx';
import ExpenseContainer from './pages/ExpenseContainer.jsx';
import './App.css'
import Login from './pages/Logins.jsx';
import { resetCategory } from './slice/Category-slice.js';
import {useDispatch} from "react-redux"
export default function App() {
  const dispatch=useDispatch()
const {isLoggedIn,handleLogout,user}=useContext(UserContext);
console.log(user)
useEffect(()=>{
    dispatch(fetchUserCategory())
    dispatch(fetchExpensedata())
},[dispatch])
return (
    <>

<h1>Expensify</h1>
<ul><li><Link to="/">home</Link></li>
{(isLoggedIn || localStorage.getItem('token')) ?(
<>
<li><Link to="/dashboard">DashBoard</Link></li>
<li><Link to="/account">Account</Link></li>
{(user?.role=="Admin" || user?.role=="moderate") &&  <li><Link to="/users-list">Users List</Link></li> }
<li><Link  to="/category">Category</Link></li>
<li><Link to="/ExpenseContainer">Expense</Link></li>
<li><Link to="/" onClick={()=>{
  handleLogout()
  dispatch(resetCategory())
  }}>logout</Link></li>
</>
): <><li><Link to="/register">Register</Link></li>
<li><Link to="/login">Login</Link></li></>}


</ul>
<Routes>
  <Route path="/" element={<Home/>}/>

    <Route path="/register" element={<Register/>}/>

    <Route path="/login" element={<Login/>}/>

    <Route path="/dashboard" element={<DashBoard/>}/>

    <Route path="/account" element={<Account/>}/>

    <Route path ="/users-list" element={<UserList/>}/>
    
    <Route path="/category" element={<Category/>}/>
    <Route path="/ExpenseContainer" element={<ExpenseContainer/>}/>

</Routes>
    </>
  )
}

