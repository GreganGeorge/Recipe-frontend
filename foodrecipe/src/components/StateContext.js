import React,{createContext,useContext,useState,useEffect} from 'react';
import {toast} from 'react-hot-toast';
const Context=createContext();
export const StateContext = ({children}) => {
    const [showCart,setShowCart]=useState(false)
    const [cartItems,setCartItems]=useState([])
    const [totalPrice,setTotalPrice]=useState(0)
    const [totalQuantities,setTotalQuantities]=useState(0)
    const [qty,setQty]=useState(1)
    let foundProduct;
    let index;
    const onAdd =(product,quantity)=>{
        var cItems=[];
        const checkProductInCart=cartItems.find((item)=>item.ingredient_id==product.ingredient_id);
        setTotalPrice((prevTotalPrice)=>prevTotalPrice+product.ingredient_price*quantity);
        setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities+quantity);
        if(checkProductInCart){
            const updatedCartItems=cartItems.map((cartProduct)=>{
                if(cartProduct.ingredient_id===product.ingredient_id) return {
                    ...cartProduct,
                    quantity:cartProduct.quantity+quantity
                }
                else
                    return{ ...cartProduct
                }
            })
            console.log('u');
            console.log(updatedCartItems);
            setCartItems(updatedCartItems);
            cItems=updatedCartItems;
        }
        else{
            product.quantity=quantity;
            setCartItems([...cartItems,{...product}]);
            cItems=[...cartItems,{...product}];
        }
        localStorage.setItem('cartItems', JSON.stringify(cItems));
        console.log('localstorage')
        console.log(localStorage.getItem('cartItems'))
        console.log('cartItems')
        console.log(cartItems)
        toast.success(`${product.ingredient_name} added to the cart.`);
    }
    const onRemove =(product)=>{
        foundProduct=cartItems.find((item)=>item.ingredient_id===product.ingredient_id)
        const newCartItems=cartItems.filter((item)=>item.ingredient_id!==product.ingredient_id)
        setTotalPrice((prevTotalPrice)=>prevTotalPrice-foundProduct.ingredient_price*foundProduct.quantity)
        setTotalQuantities(prevTotalQuantities=>prevTotalQuantities-foundProduct.quantity)
        setCartItems(newCartItems)
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    }
    const toggleCartItemQuantity =(id,value)=>{
        var cItem1=[];
        foundProduct=cartItems.find((item)=>item.ingredient_id===id)
        //index=cartItems.findIndex((product)=>product.ingredient_id===id)
        //const newCartItems=cartItems.filter((item)=>item.ingredient_id!==id)
        if(value==='inc'){
            // setCartItems([...newCartItems,{...foundProduct,quantity:foundProduct.quantity+1}]);
            // setTotalPrice((prevTotalPrice)=>prevTotalPrice+foundProduct.ingredient_price)
            // setTotalQuantities(prevTotalQuantities=>prevTotalQuantities+1)
            // cItem1=[...newCartItems,{...foundProduct,quantity:foundProduct.quantity+1}];

            var ncartitems=[...cartItems];
            var index=ncartitems.findIndex((product)=>product.ingredient_id===id)
            console.log(index)
            console.log(index)
            var qtynew=ncartitems[index].quantity+1;
            ncartitems[index].quantity=qtynew;
            setCartItems(ncartitems)
            setTotalPrice((prevTotalPrice)=>prevTotalPrice+foundProduct.ingredient_price)
            setTotalQuantities(prevTotalQuantities=>prevTotalQuantities+1)
            cItem1=[...ncartitems,{...foundProduct,quantity:foundProduct.quantity+1}];
        }
        else if(value==='dec'){

            /* if(foundProduct.quantity>1){
                setCartItems([...newCartItems,{...foundProduct,quantity:foundProduct.quantity-1}]);
                setTotalPrice((prevTotalPrice)=>prevTotalPrice-foundProduct.ingredient_price)
                setTotalQuantities(prevTotalQuantities=>prevTotalQuantities-1)
                cItem1=[...newCartItems,{...foundProduct,quantity:foundProduct.quantity-1}]
            } */
            var ncartitems=[...cartItems];
            var index=ncartitems.findIndex((product)=>product.ingredient_id===id)
            var qtynew=0;
            if(cartItems[index].quantity-1<1){
                qtynew=1
            }
            else{
                qtynew=cartItems[index].quantity-1
            }
            ncartitems[index].quantity=qtynew;
            setCartItems(ncartitems);
            setTotalPrice((prevTotalPrice)=>prevTotalPrice-foundProduct.ingredient_price)
            setTotalQuantities(prevTotalQuantities=>prevTotalQuantities-1)
        }
        localStorage.setItem('cartItems', JSON.stringify(ncartitems));
    }
    useEffect(() => {
        //console.log('useeffect')
        //console.log(localStorage.getItem('cartItems',JSON.parse(cartItems)))
        //localStorage.setItem('cartItems', JSON.stringify([]));
        var cItem=[];
        var price=0;
        var quantity1=0;
        cItem=JSON.parse(localStorage.getItem('cartItems'));
        console.log("localStorage.getItem('cartItems')",localStorage.getItem('cartItems'))
        cItem.map((item1)=>
        {
            quantity1=quantity1+item1.quantity;
            price=price+(item1.ingredient_price*item1.quantity);
        }
        )
        setTotalPrice(price);
        setTotalQuantities(quantity1);
        setCartItems(JSON.parse(localStorage.getItem('cartItems')))
  }, []);
    // const incQty=()=>{
    //     setQty((prevQty)=>prevQty+1);
    // }
    
    // const decQty=()=>{
    //     setQty((prevQty)=>{
    //         if(prevQty-1<1) return 1;
    //         return prevQty-1; 
    //     })
    // }
  return (
    <Context.Provider value={{showCart,setShowCart,cartItems,totalPrice,totalQuantities,qty,onAdd,toggleCartItemQuantity,onRemove}}>
        {children}
    </Context.Provider>
  )
}

export const useStateContext =()=>useContext(Context);