import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { BsBagCheckFill } from 'react-icons/bs';
import { useStateContext } from './StateContext';
import {runFireworks} from './utils.js'

const Success = () => {
  const {setCartItems,setTotalPrice,setTotalQuantities}=useStateContext();
  const [cartItems,setcartItems]=useState([])
  const postdata=()=>{
    var storedCartItems=[];
    storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    var ingredient_list=[];
    var numlist=[];
    console.log("storedCartItems",storedCartItems)
    if(storedCartItems && storedCartItems.length>0){
    storedCartItems.map((answer) => {
      var ingredient_item={};
      ingredient_item.ingredient_id=answer.ingredient_id;
      ingredient_item.price=answer.ingredient_price;
      ingredient_item.quantity=answer.quantity;
      ingredient_item.unit=answer.unit;
      ingredient_list.push(ingredient_item);
      console.log('ingredientlist',ingredient_list)
      numlist.push(answer.ingredient_id);
    }) }
    var ingredientlistpass=JSON.stringify(ingredient_list);
    const login_id=localStorage.getItem('login_id');
    console.log('ingredientlistpass',ingredientlistpass)
    fetch(`http://localhost:5112/api/Order?login_id=${login_id}&ingredientlistpass=${ingredientlistpass}`,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            login_id:login_id,
            ingredientlistpass:ingredientlistpass
        })
    })
    .then(res=>{res.json();
      console.log("here1")
    localStorage.setItem('cartItems', JSON.stringify([]));
  })
  console.log('here2')
  localStorage.setItem('cartItems', JSON.stringify([]));

  }
  useEffect(()=>{
    runFireworks();
    /* const storedCartItems = localStorage.getItem('cartItems');
    console.log('storedCartItems',storedCartItems)
    setcartItems(storedCartItems)
    if (storedCartItems) {
        setcartItems(JSON.parse(storedCartItems));
    } */
    postdata();
    //localStorage.setItem('cartItems', JSON.stringify([]));
  },[]);
  return (
    <div className='success-wrapper'>
      <div className='success'>
        <p className='icon'><BsBagCheckFill/></p>
        <h2>Thank you for your order!</h2>
        <p className='email-msg'>Check your email inbox for the receipt.</p>
        <p className='description'>If you have any questions,please email <Link to="mailto:order@example.com" className='email'>order@example.com</Link></p>
        <Link to='/ingredients'>
          <button type='button' width="300px" className='btn'>Continue Shopping</button>
        </Link>
      </div>
    </div>
  )
}

export default Success