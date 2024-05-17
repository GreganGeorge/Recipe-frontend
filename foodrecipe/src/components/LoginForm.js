import React, { useState } from 'react'
import { createContext } from "react";
import user_icon from "../img/person.png";
import email_icon from "../img/email.png";
import password_icon from "../img/password.png";
import { useLocation,useNavigate} from "react-router-dom"
import {variables} from './Variables.js';
import {toast} from 'react-hot-toast';
import './LoginForm.css'
import { Link } from "react-router-dom";
import { useAuth } from './AuthContext'; 
import { useLoginContext } from './LoginContext';
export const RecoveryContext = createContext();
const LoginForm = (props) => {
    const { login } = useAuth(); 
    const { setAuthenticated } = props;
    const navigate = useNavigate();
    const [action,setAction]=useState("Login")
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const { setemail } = useLoginContext();
    const [password,setPassword]=useState('')
    const url = "http://localhost:5112/api/User";
    const changeUsername=(e)=>{
        setUsername(e.target.value);
    }
    const changeEmail=(e)=>{
        setEmail(e.target.value);
        setemail(e.target.value);
    }
    const changePassword=(e)=>{
        setPassword(e.target.value);
    }
    const getData3 = async (url1) => {
        try {
            console.log("url1");
            console.log(url1);
          //setLoading(true);
          fetch(url1)
            .then((response) => response.json())
            .then((json) => {
              if(json.length>0){
                toast.success("Logged in");
                //alert("Logged in");
                //window.localStorage.setItem("isLoggedIn", 'Yes');
                //setAuthenticated(true);
                localStorage.setItem('isAuthenticated', 'true');
                login(email,json[0].login_id);
                navigate(`/`); 
              }
              else{
                toast.error("Incorrect credentials");
                //alert("Incorrect password");
              }
            });
          //setLoading(false);
        } catch (err) {
          //setError(err.message);
        }
      };
    const createClick = () => {
        if(action=="Sign Up")
        {
        var proceed=true;
        console.log('username');
        console.log(username);
        if(username=="" || email=="" || password=="")
        {
            proceed=false;
        }
        if(proceed==true)
        {
        var passItem={};
        passItem.userName=username;
        passItem.email=email;
        passItem.password=password;
        console.log('passItem');
        console.log(passItem);
        fetch("http://localhost:5112/api/User",{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                userName:username,
                email:email,
                password:password
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            //this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }}
    else{
    var userData=[];
    var user={};
    user.username=''
    user.email=email;
    user.password=password;
    userData.push(user);  
   var userDataPass=JSON.stringify(userData);
   //const url1 = `http://localhost:5112/api/User/Get?reg=${userDataPass}`;
   const url1 = `http://localhost:5112/api/user/Get1?password=${password}&email=${email}`;
   getData3(url1);
    }
    }
  return (
    <div className='container1'>
                <RecoveryContext.Provider
      value={{email}}
    >
    </RecoveryContext.Provider>
        <div className='submit-container'>
            <div className={action==='Sign Up'?'submit gray':'submit'} onClick={()=>{setAction("Login")}}>Login</div>
            <div className={action==='Login'?'submit gray':'submit'} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
        </div>
        <div className='header mt-20'>
            <div className='text'>{action}</div>
            <div className='underline'></div>
        </div>
        <div className='inputs'>
            {action==='Login'?<div></div>:<div className='input'>
                <img src={user_icon} alt=""/>
                <input type="text" placeholder='Name' value={username} onChange={changeUsername}/>
            </div>}
            <div className='input'>
                <img src={email_icon} alt=""/>
                <input type="email" placeholder='Email Id' value={email} onChange={changeEmail}/>
            </div>
            <div className='input'>
                <img src={password_icon} alt=""/>
                <input type="password" placeholder='Password' value={password} onChange={changePassword}/>
            </div>
        </div>
        {action==='Sign Up'?<div></div>:<Link to='/otp' className='forgot-password'>Forgot Password?</Link>}
        <div className='submit-container'>
        <a href="#_" class="relative inline-flex items-center justify-start px-8 py-5 text-xl overflow-hidden font-semibold transition-all bg-white rounded hover:bg-white group">
        <span class="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
        <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white" onClick={()=>createClick()}>{action}</span>
        </a>
        </div>
    </div>
  )
}

export default LoginForm