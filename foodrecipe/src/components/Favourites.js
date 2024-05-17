import { useState,useEffect } from "react";
import Recipe from "./Recipe";
import { Link } from "react-router-dom";


const Favourites = ({ saveItem }) => {
    console.log(saveItem);
    const [data,setData]=useState([])
    const [visible,setVisible]=useState(4);
    const showMoreItems =()=>{
      setVisible((prevValue)=>prevValue+4)
    }
    const getData = async () => {
        const login_id = localStorage.getItem('login_id');
        const url = `http://localhost:5112/api/Favourite?login_id=${login_id}`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          setData(data);
          console.log('data')
          console.log(data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      useEffect(() => {
        getData();
    }, []);
  return (
    <>
    <div className="favourites">
      {data.length === 0 && (
        <p className="lg:text-4xl text-xl text-center text-red-300 font-semibold">
          Favourites list is empty
        </p>
      )}
      <div className="favourite container mx-auto py-5 flex flex-wrap justify-center gap-5">
            {/* {data.map((recipe) => (
            <div className="recipe flex flex-col w-80  overflow-hidden p-5 bg-white/75 shadow-xl shadow-red-100 gap-5 border-2 rounded-2xl border-white">
            <div className="recipe-img h-40 flex justify-center  overflow-hidden items-center rounded-xl">
            <img src={recipe.recipe_image} className="w-full block  " alt="" />
            </div>
            <div className="recipe-text">
            <h4 className="recipe-title text-2xl truncate font-semibold text-red-500">
                {recipe.recipe_name}
            </h4>
            <Link
                to={`/recipe-item/${recipe.recipe_id}`}
                className="text-red-50 p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-2 bg-gradient-to-br from-red-400 to-red-500  inline-block  shadow-md  shadow-red-200 hover:shadow-lg hover:shadow-red-300 "
            >
                View Recipe
            </Link>
            </div>
            </div>
        ))} */}
        {data?.length > 0 &&
           data.slice(0,visible).map((recipe) => 
       <div className="recipe flex flex-col w-80  overflow-hidden p-5 bg-white/75 shadow-xl shadow-red-100 gap-5 border-2 rounded-2xl border-white">
         <div className="recipe-img h-40 flex justify-center  overflow-hidden items-center rounded-xl">
           <img src={recipe.recipe_image} className="w-full block  " alt="image" />
         </div>
         <div className="recipe-text">
           <span className="recipe-publisher mr-20 text-md text-blue-700 font-medium">
               {recipe.recipe_name}
           </span>
           <Link
             to={`/recipe-item/${recipe.recipe_id}`}
             className="text-red-50 p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-2 bg-gradient-to-br from-red-400 to-red-500  inline-block  shadow-md  shadow-red-200 hover:shadow-lg hover:shadow-red-300 "
           >
             View Recipe
           </Link>
         </div>
       </div>
       )}
      </div>
    </div>
    <div className="flex flex-col lg:flex-row justify-center">
    <div className="flex justify-center md:justify-center">
    {data.length > visible && (
    <button className="mb-10 mt-5 border  rounded-xl px-2 py-1  border-orange-700
     text-white bg-orange-700 hover:bg-white hover:text-orange-700 hover:border-orange-700" onClick={showMoreItems}>Load More</button>
    )}
    </div>
  </div>
  </>
  );
};

export default Favourites;
