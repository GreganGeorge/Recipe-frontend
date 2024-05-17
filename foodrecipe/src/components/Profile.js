import React, { useState,useEffect } from 'react'
import { useLoginContext } from './LoginContext';
import {toast} from 'react-hot-toast';
import './Profile.css'
const Profile = () => {
    const { email } = useLoginContext();
    const [data,setData]=useState([]);
    const [user,setUser]=useState('');
    const [mail,setMail]=useState('');
    const [phone,setPhone]=useState();
    const [address,setAddress]=useState('');
    const getData = async () => {
        const storedEmail = localStorage.getItem('email');
        const url = `http://localhost:5112/api/user/Get4?email=${storedEmail}`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          setData(data);
          setUser(data[0]?.username);
          setMail(data[0]?.email);
          setAddress(data[0]?.address);
          setPhone(data[0]?.phone_number);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      useEffect(() => {
        getData();
    }, []);
    const update=()=>{
        fetch(`http://localhost:5112/api/user/Put2?email=${mail}&username=${user}&address=${address}&phone_number=${phone}`,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:mail,
                username:user,
                address:address,
                phone_number:phone
            })
            })
            .then(res=>res.json())
            .then((result)=>{
                toast.success(result);
                getData();
            },(error)=>{
                toast.error('Failed');
            })
    }
  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded shadow mt-40 mb-60">
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <p className="mt-1 text-lg text-gray-900">{mail}</p>
    </div>
    <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <input
            id="username"
            type="text"
            value={user}
            onChange={(e)=>setUser(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border bg-gray-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
    </div>
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
            type="text"
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border bg-gray-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
    </div>
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
            type="text"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border bg-gray-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
    </div>
    <button
        className="w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={update}
    >
        Save Changes
    </button>
</div>
  )
}

export default Profile