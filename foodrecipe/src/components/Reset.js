import React, { useState } from "react";
import { useLoginContext } from './LoginContext';
import { useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast';
const Reset = () => {
    const [newPassword,setNewPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const navigate = useNavigate();
    const { email } = useLoginContext();
    const changeNewPassword=(e)=>{
        setNewPassword(e.target.value);
    }
    const changeConfirmPassword=(e)=>{
        setConfirmPassword(e.target.value);
    }
    function changePassword(){
        if(newPassword===confirmPassword)
        {
            console.log(newPassword)
            fetch(`http://localhost:5112/api/user?password=${newPassword}&email=${email}`,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                password:newPassword
            })
            })
            .then(res=>res.json())
            .then((result)=>{
                toast.success(result);
                navigate('/login')
            },(error)=>{
                toast.error('Failed');
            })
        }
        else
        {
            toast.error("Check Passwords");
        }
    }
    return (
        <div>
          <section className="bg-white -mt-40 w-screen dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Change Password
                </h2>
                <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-100 border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      value={newPassword}
                      onChange={changeNewPassword}
                    ></input>
                  </div>
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="confirm-password"
                      id="confirm-password"
                      placeholder="••••••••"
                      className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      value={confirmPassword}
                      onChange={changeConfirmPassword}
                    ></input>
                  </div>
                </form>
                <button
                  onClick={() => changePassword()}
                  className="w-full mt-2 text-white bg-purple-700 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Reset passwod
                </button>
              </div>
            </div>
          </section>
        </div>
      );
}

export default Reset