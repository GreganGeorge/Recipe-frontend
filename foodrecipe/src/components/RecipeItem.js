import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDataFetch } from "../hook/useDataFetch";
import {toast} from 'react-hot-toast';
import './RecipeItem.css'
import ReactPlayer from 'react-player';

const RecipeItem = ({ handleFavourites, saveItem }) => {
  const [itemSaveStatus, setItemSaveStatus] = useState(false);
  const { recipe_id } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const { data, loading, error } = useDataFetch(recipe_id);

  const durationCalc = (duration) => {
    if (!duration) return null;
    if (!String(duration).includes(".")) {
      return duration + "h";
    }
    if (String(duration).includes(".")) {
      const splitDuration = String(duration).split(".");

      const hours = splitDuration[0] + "h";

      const miniutes = String(+(splitDuration[1] / 100) * 60).split(".");
      const min = miniutes[0] + "min";

      return hours + min;
    }
  };
  const fetchData=async()=>{
    const login_id = localStorage.getItem('login_id');
    const url = `http://localhost:5112/api/Favourite/Get2?recipe_id=${recipe_id}&login_id=${login_id}`;

    try {
      const response = await fetch(url);
      const data1 = await response.json();
      if(data1.length>0)
      {
        setItemSaveStatus(true);
      }
      else
      {
        setItemSaveStatus(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const handleFavourite=(id)=>{
    const login_id = localStorage.getItem('login_id');
    if(itemSaveStatus===false){
      setItemSaveStatus(true)
      fetch(`http://localhost:5112/api/Favourite?login_id=${login_id}&recipe_id=${id}`,{
          method:'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              login_id:login_id,
              recipe_id:id
          })
      })
      .then(res=>res.json())
      .then((result)=>{
          toast.success(result);
      },(error)=>{
          toast.error('failed');
      })}
    else{
      setItemSaveStatus(false)
      fetch(`http://localhost:5112/api/Favourite?recipe_id=${recipe_id}&login_id=${login_id}`,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            toast.success(result)

        },(error)=>{
            toast.error('Failed')
        })
    }
  }
  const fetchrecipeData = async (val) => {
    console.log('fetchdata');
    console.log(val);
    const ingredientid = val;
    const url = `http://localhost:5112/api/ingredient1?recipe_id=${val}`;
  
    try {
      const response = await fetch(url);
      const data1 = await response.json();
      console.log('receipe');
      console.log(data1);
      setIngredients(data1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    if (!data) return null;
    setItemSaveStatus(saveItem.some((item) => item.id === data.id));
    fetchrecipeData(recipe_id);
    fetchData();
  }, [data]);
  return (
    <>
        <>
          <div className="recipe-item container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="left row-start-2 lg:row-start-auto ">
              <div className="singleItemImage h-96 overflow-hidden rounded-xl group  ">
                {ingredients && ingredients.length>0 && (
                <img
                  src={ingredients[0].recipe_image}
                  className=" w-full h-full object-cover block group-hover:scale-105 duration-300"
                  alt=""
                />)}
              </div>
              {/* <div className="ingredients  mt-4 ">
                <span className="text-2xl font-semibold text-red-500 ">
                  Ingredients:
                </span>
                <ul className="flex flex-col gap-3">
                  {ingredients?.map((ingredient, i) => (
                    <li key={i}>
                      <span className="font-bold text-2xl text-red-300 ">
                        ✓{" "} 
                      </span>
                      <span className="font-semibold text-lg text-red-400">
                        {ingredient.ingredient_name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>
            <div className="right flex flex-col gap-3">
              <span className="recipe-publisher text-sm text-cyan-500 font-medium">
                {data.publisher}
              </span>
              <h2 className="recipe-title text-4xl truncate font-semibold text-red-500">
                {data.title}
              </h2>
              <div className="serving_cooking-time flex gap-5 uppercase tracking-widest font-semibold text-rose-300">
                {/* <div className="servings">Servings: {data.servings} people</div>
                <div className="cooking-time">
                  Cooking Time:
                  {data?.cooking_time < 60
                    ? String(data.cooking_time) + "min"
                    : durationCalc(data?.cooking_time / 60)}
                </div> */}
              </div>
              {ingredients && ingredients.length>0 && (<>
                    <span className="font-semibold row-start-2 lg:row-start-auto text-3xl text-red-400">
                    {ingredients[0].recipe_name}
                  </span></>)}
                  <div className="line-1"></div>
              <div className="btns flex gap-5">
                <button
                  onClick={() => handleFavourite(recipe_id)}
                  className={`text-red-50 p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider bg-gradient-to-br ${
                    itemSaveStatus
                      ? "from-rose-400 to-rose-500  inline-block  shadow-md  shadow-rose-200 hover:shadow-lg hover:shadow-rose-300"
                      : "from-cyan-400 to-cyan-500  inline-block  shadow-md  shadow-cyan-200 hover:shadow-lg hover:shadow-cyan-300"
                  }`}
                >
                  {itemSaveStatus
                    ? "- Remove from favourites"
                    : "+ Save as favourite"}
                </button>
                
                {/* <button className="text-red-50 p-3 px-8 rounded-lg text-xs uppercase font-medium tracking-wider mt-2 bg-gradient-to-br from-orange-400 to-orange-500  inline-block  shadow-md  shadow-orange-200 hover:shadow-lg hover:shadow-orange-300">
                  Get Directions
                </button>
                <button className="text-red-50 p-3 px-8 rounded-lg text-xs uppercase font-medium tracking-wider mt-2 bg-gradient-to-br from-red-400 to-red-500  inline-block  shadow-md  shadow-red-200 hover:shadow-lg hover:shadow-red-300">
                  Go Home
                </button> */}
              </div>
              <div className='ingredients my-5 px-3 py-3'>
                <h6 className='fs-16 text-white text-2xl'>Ingredients</h6>
                <ul className='grid'>
                  {
                    ingredients?.map((ingredient, idx) => (
                      <li key = {idx} className = "flex align-center">
                        <span className='li-dot'>{idx + 1}</span>
                        <span className='text-capitalize text-lg text-white fs-15'>{ingredient.ingredient_name}</span>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className='ingredients my-5 px-3 py-3'>
                <h6 className='fs-16 text-white text-2xl mb-3'>Nutritions</h6>
                {ingredients && ingredients.length > 0 && (
                      <li className = "flex align-center">
                        <span className='text-capitalize text-lg text-white fs-15'>{ingredients[0].nutrition}</span>
                      </li>)}
              </div>
              <div className='ingredients my-5 px-3 py-3'>
                <h6 className='fs-16 text-white text-2xl mb-3'>Instructions</h6>
                {ingredients && ingredients.length > 0 && (
                      <li className = "flex align-center">
                        <span className='text-capitalize text-lg text-white fs-15'>{ingredients[0].instructions}</span>
                      </li>)}
              </div>
              <h6 className='fs-16 text-orange-700 text-2xl mb-3'>Video Tutorial</h6>
              {ingredients && ingredients.length > 0 && (
              <ReactPlayer light={true} controls={true} url={ingredients[0].video} height="500px" width="750px"/>)}
            </div>
          </div>
        </>
    </>
  );
};

export default RecipeItem;
