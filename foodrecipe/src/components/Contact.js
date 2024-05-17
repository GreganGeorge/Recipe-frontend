import React, { useState } from 'react';
import {toast} from 'react-hot-toast';
const Contact = () => {
    const [email,setEmail]=useState('');
    const [username,setUsername]=useState('');
    const [suggestion,setSuggestion]=useState('');
    function add(e){
        e.preventDefault();
        console.log('hi');
        fetch(`http://localhost:5112/api/user/Post2?email=${email}&username=${username}&suggestion=${suggestion}`,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:email,
                username:username,
                suggestion:suggestion,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            toast.success(result);
            setEmail('');
            setSuggestion('');
            setUsername('');
        },(error)=>{
            toast.error('failed');
        })
      }
  return (
    <div className="max-w-md mx-auto mt-20">
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            className="mt-1 block w-full bg-white h-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
            className="mt-1 block w-full bg-white h-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            rows="10"
            value={suggestion}
            onChange={(e)=>setSuggestion(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <button className="w-full mb-60 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
           onClick={add}>
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
