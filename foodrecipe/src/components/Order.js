import React, { useEffect, useState } from 'react';
import {toast} from 'react-hot-toast';

const Order = () => {
    const [orderItems, setOrderItems] = useState([]);
    const fetchData = async () => {
        const login_id=localStorage.getItem("login_id");
        const url = `http://localhost:5112/api/order/Get1?login_id=${login_id}`;
        try {
          const response = await fetch(url);
          const data1 = await response.json();
          setOrderItems(data1);
          console.log("data1",data1)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Order Details</h1>
            <div className="bg-white rounded-lg shadow-md p-4 mb-8">
                <div className="grid grid-cols-5 gap-5 border-b border-gray-300 pb-2 mb-4">
                    <span className="font-medium">Ingredient Name</span>
                    <span className="font-medium">Price</span>
                    <span className="font-medium">Quantity</span>
                    <span className="font-medium">Unit</span>
                    <span className="font-medium">Subtotal</span>
                </div>
                {orderItems.map(item => (
                    <div key={item.ingredient_id} className="grid grid-cols-5 gap-5 items-center mb-2">
                        <div className="flex items-center col-span-1">
                        <div className="relative w-12 h-12 mr-2 rounded-full overflow-hidden">
                            <img src={item.ingredient_image} alt={item.ingredient_name} className="absolute inset-0 w-full h-full object-cover" />
                
                        </div>
                        <span>{item.ingredient_name}</span>
                        </div>
                        
                        <span className="col-span-1">₹{item.price}</span>
                        <span className="col-span-1">{item.quantity}</span>
                        <span className="col-span-1">{item.unit}</span>
                        <span className="col-span-1">₹{(item.price * item.quantity)}</span>
                    </div>
                ))}
                <div className="mt-4 flex justify-end">
                    <span className="font-semibold">Total: ₹{
                        orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
                    }</span>
                </div>
            </div>
        </div>
    );
};

export default Order;
