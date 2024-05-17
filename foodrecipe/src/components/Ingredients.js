import React, { useState, useEffect,useRef } from 'react';
import { Link,useLocation,useNavigate} from "react-router-dom"
import {useStateContext} from './StateContext';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useForceUpdate } from 'framer-motion';
const Ingredients = () => {
    const input = useRef(null);
    const [searchItem, setSeachItem] = useState("");
    const [visible,setVisible]=useState(4);
    const [recipes,setRecipes]=useState([])
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {qty,onAdd}=useStateContext();
    const incQtyNew1=(recipe)=>{
      var nrecipes=[...recipes];
      var index=nrecipes.findIndex((product)=>product.ingredient_id===recipe.ingredient_id)
      var qtynew=recipe.qty+1;
      nrecipes[index].qty=qtynew;
      setRecipes(nrecipes);
        
  }
    const incQtyNew=(recipe,recipes)=>{
      console.log('recipe');
      console.log(recipe);
      console.log('recipes');
      console.log(recipes);
      var rec=recipes;
      var qtynew=0;

      // rec.forEach(element => {
      //   if(element.ingredient_id===recipe.ingredient_id){
      //     qtynew=element.qty+1
      //     recipe.qty=qtynew;
      //   }
      // });
      //setRecipes(rec);
      var foundProduct=rec.find((item)=>item.ingredient_id===recipe.ingredient_id)
      var index=rec.findIndex((product)=>product.ingredient_id===recipe.ingredient_id)
        const newCartItems=rec.filter((item)=>item.ingredient_id!==recipe.ingredient_id)
            setRecipes([...newCartItems,{...foundProduct,qty:foundProduct.qty+1}]);
        
  }
  const decQtyNew1=(recipe)=>{
    var nrecipes=[...recipes];
    var index=nrecipes.findIndex((product)=>product.ingredient_id===recipe.ingredient_id)
    var qtynew=0;
    if(recipe.qty-1<1){
        qtynew=1
    }
    else{
        qtynew=recipe.qty-1
    }
    nrecipes[index].qty=qtynew;
    setRecipes(nrecipes);
}

    const decQtyNew=(recipe,recipes)=>{
      var qtynew=0;
      var rec=recipes;
      if(recipe.qty-1<1){
          qtynew=1
      }
      else{
          qtynew=recipe.qty-1
      }
      var foundProduct=rec.find((item)=>item.ingredient_id===recipe.ingredient_id)
      var index=rec.findIndex((product)=>product.ingredient_id===recipe.ingredient_id)
      const newCartItems=rec.filter((item)=>item.ingredient_id!==recipe.ingredient_id)
      setRecipes([...newCartItems,{...foundProduct,qty:qtynew}]);
  }
    const showMoreItems =()=>{
        setVisible((prevValue)=>prevValue+4)
      }
    const handleSearch = (e) => {
        if(searchItem)
        {
        e.preventDefault();
        //getData(searchItem);
        input.current.blur();
        setSeachItem("");
        setRecipes([]);
        setError("");
        //navigate("/recipes/${searchItem}");
        //navigate(`/recipes/${searchItem}`);
        }
      };
      const fetchingredientData = async () => {
        console.log('fetchdataa1');
        const url = `http://localhost:5112/api/recipe/Get2?ingredient_name=${searchItem}`;
        try {
          const response = await fetch(url);
          const data1 = await response.json();
          console.log('receipe');
          console.log(data1);
          setRecipes(data1);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      const fetchFullData = async () => {
        console.log('fetchdataa1');
        const url1 = `http://localhost:5112/api/recipe/Get4`;
        try {
          const response1 = await fetch(url1);
          const data2 = await response1.json();
          setRecipes(data2)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      useEffect(() => {
        if(searchItem===""){
          fetchFullData();
        }
          fetchingredientData();

      }, [searchItem]);
      useEffect(() => {
        fetchFullData();

    },[]);
  return (
    <div>
        <form className="search-bar text-center mt-10" onSubmit={handleSearch}>
        <>
        <input
          type="search"
          ref={input}
          value={searchItem}
          onChange={(e) => setSeachItem(e.target.value)}
          className="bg-white/75 p-3 px-8 rounded-full outline-none lg:w-96 shadow-lg shadow-red-100 focus:shadow-red-200"
          placeholder="Search for Ingredients"
        />
        </>
      </form>
      <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
        {/* {searchItem.length===0?(
            <div>Hello</div>):null
        } */}
    {recipes.length === 0 ? (
      <div>
        <p className="lg:text-4xl text-xl text-center mt-10 text-red-300 font-semibold">
          Nothing to show, please search something!
        </p>
      </div>
    ) : null}
     <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
     {recipes?.length > 0 &&
         recipes.slice(0,visible).map((recipe) => 
     <div className="recipe flex flex-col w-80  overflow-hidden p-5 bg-white/75 shadow-xl shadow-red-100 gap-5 border-2 rounded-2xl border-white">
       <div className="recipe-img h-40 flex justify-center  overflow-hidden items-center rounded-xl">
         <img src={recipe.ingredient_image} className="w-full block  " alt="image" />
       </div>
       <div className="recipe-text">
         <span className="recipe-publisher mr-20 text-md text-blue-700 font-medium">
             {recipe.ingredient_name}
         </span>
         <span className='font-medium  -ml-16 text-blue-800'>({recipe.unit})</span>
            <p>
                <span className='mt-4 mr-10 font-medium'>₹{recipe.ingredient_price}</span>
                <span className='cursor-pointer mr-1 inline-block text-red-600' onClick={()=>decQtyNew1(recipe)}><AiOutlineMinus/></span>
                <span className='mr-1 inline-block font-medium'>{recipe.qty}</span>
                <span className='cursor-pointer inline-block text-green-600' onClick={()=>incQtyNew1(recipe)}><AiOutlinePlus/></span>
            </p>
         {/* <h4 className="recipe-title text-2xl truncate font-semibold text-red-500">
           {recipe.recipe_id}
         </h4> */}
         <button
           className="text-red-50 p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-2 bg-gradient-to-br from-red-400 to-red-500  inline-block  shadow-md  shadow-red-200 hover:shadow-lg hover:shadow-red-300 "
           onClick={()=>onAdd(recipe,recipe.qty)}
         >
           ADD TO CART
         </button>
       </div>
     </div>
     )}
     </div>
  </div>
  <div className="flex flex-col lg:flex-row justify-center">
        <div className="flex justify-center md:justify-center">
        {recipes.length> visible && (
        <button className="mb-10 -mt-5 border  rounded-xl px-2 py-1  border-orange-700
         text-white bg-orange-700 hover:bg-white hover:text-orange-700 hover:border-orange-700" onClick={showMoreItems}>Load More</button>
        )}
        </div>
      </div>
    </div>
  )
}

export default Ingredients