import React, { useRef, useState,useEffect } from 'react';
//import Link from 'next/link';
import { Link} from "react-router-dom"
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from './StateContext';
import getStripe from './getStripe';
import { useNavigate} from "react-router-dom"
import axios from 'axios';
import { useAuth } from './AuthContext'; 
import './Modal.css';
const Cart = () => {
    const navigate = useNavigate();
    const [isOpen,setIsOpen]=useState(false)
    const [data,setData]=useState([])
    const [address,setAddress]=useState('')
    const [user,setUser]=useState('')
    const [phone,setPhone]=useState('')
    const { loggedIn } = useAuth(); 
    const cartRef=useRef();
    const {totalPrice,totalQuantities,cartItems,setShowCart,toggleCartItemQuantity,onRemove}=useStateContext();
    const toggleModal = () => {
        setIsOpen(!isOpen);
        console.log(isOpen)
      };
      const getData = async () => {
        const storedEmail = localStorage.getItem('email');
        const url = `http://localhost:5112/api/user/Get4?email=${storedEmail}`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          setData(data);
          setUser(data[0]?.username);
          setAddress(data[0]?.address);
          setPhone(data[0]?.phone_number);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      useEffect(() => {
        getData();
    }, []);
    const handleCheckout = async () => {
        if(loggedIn===false)
        {
            navigate('/login');
        }
        else
        {
            try {
                const stripe = await getStripe(); // Assuming getStripe function retrieves the Stripe instance
        
                const response = await axios.post('http://localhost:5112/api/stripe/create-checkout-session', cartItems, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${'pk_test_51P2BgZSAzlT6XHrmRqB6GtO9EsXpgACjyDyyXoe27XlLTUcJOoOr7ZL2jIUplaw1tiFA6P555aBeJcVDG4ymKkR100PcI3TmGD'}` // Replace STRIPE_PUBLISHABLE_KEY with your actual publishable key
                    }
                });
        
                const { sessionId } = response.data;
                console.log('sessionId',sessionId)
                toast.loading('Redirecting to checkout...');
                stripe.redirectToCheckout({ sessionId });
            } catch (error) {
                console.error('Error creating checkout session:', error);
                toast.error('Error creating checkout session. Please try again later.');
            }
        }
    };
    
    // const handleCheckout=async()=>{
    //     const stripe=await getStripe();
    //     const response= await fetch('/stripe',{
    //         method:'POST',
    //         headers:{
    //             'Content-Type':'application/json',
    //         },
    //         body:JSON.stringify(cartItems),
    //     });
        
    //     if(response.statusCode===500) return;
    //     const data=await response.json();
    //     toast.loading('Redirecting...');
    //     stripe.redirectToCheckout({sessionId:data.id});
    // }
  return (
    <div className='cart-wrapper' ref={cartRef}>
        <div className='cart-container'>
            <button type="button" className='cart-heading' onClick={()=>setShowCart(false)}><AiOutlineLeft/>
            <span className='heading'>Your Cart</span>
            <span className='cart-num-items'>({totalQuantities} items)</span>
            </button>
            {cartItems.length<1 && (
                <div className='empty-cart'>
                    <AiOutlineShopping className='ml-40' size={150}/>
                    <h3>Your shopping bag is empty</h3>
                    <Link to ='/ingredients'>
                        <button type="button" onClick={()=>setShowCart(false)} className='btn'>
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            )}
            <div className='product-container'>
                {cartItems.length>=1 && cartItems.map((item)=>(
                    <div className='product inline-block' key={item.ingredient_id}>
                        <img src={item.ingredient_image} className='cart-product-image inline-block'/>
                        <div className='item-desc inline-block'>
                            <div className='flex top ml-10'>
                                <h5 className='inline-block font-bold'>{item.ingredient_name}</h5>
                                <h5 className='inline-block font-medium'>({item.unit})</h5>
                                <h4 className='inline-block font-bold'>₹{item.ingredient_price}</h4>
                            </div>
                            <div className='flex w-52 bottom ml-10'>
                                <div>
                                    <p>
                                        <span className='cursor-pointer mr-1 inline-block text-red-600' onClick={()=>toggleCartItemQuantity(item.ingredient_id,'dec')}><AiOutlineMinus/></span>
                                        <span className='mr-1 inline-block font-medium'>{item.quantity}</span>
                                        <span className='cursor-pointer inline-block text-green-600' onClick={()=>toggleCartItemQuantity(item.ingredient_id,'inc')}><AiOutlinePlus/></span>
                                    </p>                           
                                </div>
                                <button type="button" className='remove-item' onClick={()=>onRemove(item)}>
                                    <TiDeleteOutline/>
                                </button>
                            </div>
                        </div>
                        <span className='inline-block ml-5 font-medium'>Subtotal: {item.quantity * item.ingredient_price}</span>
                    </div>
                ))}
            </div>
            {cartItems.length>=1&&(
                <div className='con cart-bottom'>
                    <div className='total'>
                        <h3 className='font-medium'>Total: ₹{totalPrice}</h3>
                    </div>
                    <div className='btn-container'>
                        <button type="button" className='btn' onClick={toggleModal}>Pay</button>
                        {isOpen && (
                            <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center">
                                <div className="modal-container bg-white w-96 p-8 rounded-lg shadow-lg">
                                    <h2 className="text-lg font-semibold mb-4">Delivery Details</h2>
                                    <div className="mb-4">
                                        <label htmlFor="address" className="block text-sm font-medium mb-1">Name</label>
                                        <input type="text" id="address" className="input-field bg-gray-100" value={user} onChange={(e)=>setUser(e.target.value)} placeholder="Enter your Name" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
                                        <input type="text" id="address" className="input-field bg-gray-100" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Enter your address" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                                        <input type="text" id="phone" className="input-field bg-gray-100" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Enter your phone number" />
                                    </div>
                                    <div className="flex justify-between">
                                        <button type="button" className="btn btn-secondary mr-2" onClick={toggleModal}>Cancel</button>
                                        <button type="button" className="btn btn-primary" onClick={handleCheckout}>Pay</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default Cart