import React,{useEffect, useState} from 'react'
import {BsChevronCompactLeft,BsChevronCompactRight} from "react-icons/bs";
import {RxDotFilled} from 'react-icons/rx';
import { Link } from 'react-router-dom';
const MainContainer = () => {
    const sliders=[
        {
            url: 'https://res.cloudinary.com/ehizeex-shop/image/upload/v1672672076/NetflixApp/burger_emxbtv.jpg'
          },
          {
            url: 'https://res.cloudinary.com/ehizeex-shop/image/upload/v1672672452/NetflixApp/pizza_osjb4f.jpg'
          },
          {
            url: 'https://res.cloudinary.com/ehizeex-shop/image/upload/v1672672612/NetflixApp/ric_a4ewxo.jpg',
          },
    ]
    const [recipe,setRecipe]=useState([])
    const [recipeList,setRecipeList]=useState([])
    const [visible,setVisible]=useState(4);
    const fetchRecipeData = async () => {
      console.log('fetchdata');
      const url = `http://localhost:5112/api/Recipe/Get3`;
      try {
        const response = await fetch(url);
        const data1 = await response.json();
        console.log('receipe');
        console.log(data1);
        setRecipe(data1);
        setRecipeList(data1);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const showMoreItems =()=>{
      setVisible((prevValue)=>prevValue+4)
    }
   const fillterveg_nonveg = (vegnon) => {
    setRecipeList(
      recipe.filter((item) => {
        return item.veg_nonveg === vegnon;
      })
    );
   };
    const [currentIndex, setCurrentIndex] = useState(0)
    const prevSlider=()=>{
        const isFirstSlide=currentIndex===0
        const newIndex=isFirstSlide?sliders.length-1:currentIndex -1
        setCurrentIndex(newIndex)
    }
    const nextSlider=()=>{
        const isLastSlide=currentIndex===sliders.length -1
        const newIndex=isLastSlide?0:currentIndex+1
        setCurrentIndex(newIndex)
    }
    const moveToNextSlide=(slideIndex)=>{
      setCurrentIndex(slideIndex)
    }
    useEffect(()=>{
      const timer=setTimeout(()=>{
        if(currentIndex===2){
          setCurrentIndex(0)
        }
        else{
          setCurrentIndex(currentIndex+1)
        }
      },4000)
      return ()=>clearTimeout(timer)
    },[currentIndex])
    useEffect(()=>{
      fetchRecipeData()
    },[])
  return (
    <>
    <div className='max-w-[1800px] h-[650px] w-full m-auto py-4 px-4 relative group'>
        <div className='w-full h-full rounded-2xl bg-center bg-cover duration-300'
             style={{backgroundImage: `url(${sliders[currentIndex].url})`}}
        ></div>
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-orange-700 text-white cursor-pointer'>
            <BsChevronCompactLeft onClick={prevSlider}/>
        </div>
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-orange-700 text-white cursor-pointer'>
            <BsChevronCompactRight onClick={nextSlider}/>
        </div>
        <div  className='flex top-4 justify-center py-2'>
             {
                sliders.map((sliderItems, slideIndex)=>(
                   <div 
                    key={slideIndex}
                    onClick={()=>moveToNextSlide (slideIndex)}
                   className='text-2xl cursor-pointer'>
                    <RxDotFilled/>
                   </div>
                ))
             }
        </div>
    </div>
    <div className="max-w-[1800px] m-auto px-4 py-12">
    <h1 className="text-orange-500 font-bold text-2xl text-center py-2">
        Category
      </h1>
      <div className="flex flex-col lg:flex-row justify-center">
        <div className="flex justify-center md:justify-center">
          <button 
          onClick={()=>setRecipeList(recipe)}
          className="m-1 border  rounded-xl px-2 py-1  border-orange-700 text-white bg-orange-700 hover:bg-white hover:text-orange-700 hover:border-orange-700">
            All
          </button>
          <button
           onClick={()=>fillterveg_nonveg("veg")}
          className="m-1 border rounded-xl px-2 py-1  border-orange-700 text-white bg-orange-700 hover:bg-white hover:text-orange-700 hover:border-orange-700">
            Veg
          </button>
          <button 
           onClick={()=>fillterveg_nonveg("nonveg")}
          className="m-1 border rounded-xl px-2 py-1  border-orange-700 text-white bg-orange-700 hover:bg-white hover:text-orange-700 hover:border-orange-700">
            Non Veg
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-6  py-4">
      {recipeList?.length > 0 && recipeList.slice(0,visible).map((item) =>
          <div
            key={item.recipe_id}
            className="border-none hover:scale-105 duration-300"
          >
            <img
              src={item.recipe_image}
              alt={item.recipe_name}
              className="w-full h-[200px] object-cover rounded-lg"
            />
            <div className="flex justify-between py-2 px-2">
              <p className="font-bold ">{item.recipe_name}</p>
              <Link
             to={`/recipe-item/${item.recipe_id}`}
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
        {recipe.length > visible && (
        <button className="mb-10 -mt-5 border  rounded-xl px-2 py-1  border-orange-700
         text-white bg-orange-700 hover:bg-white hover:text-orange-700 hover:border-orange-700" onClick={showMoreItems}>Load More</button>
        )}
        </div>
      </div> 
    </>
  )
}

export default MainContainer