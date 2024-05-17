import React, { useState, useEffect } from 'react';
import FryingPan from "./FryingPan";
import { Link } from "react-router-dom";
const MenuContainer = () => {
  const predefinedOptions = ['Option 1', 'Option 2', 'Option 3'];
  const [ingredients,setIngredients]=useState([])
  const [recipes,setRecipes]=useState([])
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [visible,setVisible]=useState(4);
    const showMoreItems =()=>{
      setVisible((prevValue)=>prevValue+4)
    }
  const fetchingredientData = async () => {
    console.log('fetchdata');
    const url = `http://localhost:5112/api/ingredient1/Get2`;
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
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
      console.log("useEffect");
      fetchingredientData();
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedOptions]);

  const handleOptionChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setDropdownOpen(true);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const getData3 = async (url1,numlist) => {
    try {
      setLoading(true);
      fetch(url1)
        .then((response) => response.json())
        .then((json) => {
          setRecipes(json);
          console.log('json');
          console.log(json);
        });
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };
  const handleSubmit = () => {
    var ingredient_list=[];
    var numlist=[];
    selectedOptions.forEach(answer => {
      var ingredient_item={};
      ingredient_item.ingredient_id=answer.ingredient_id;
      ingredient_list.push(ingredient_item);
      numlist.push(answer.ingredient_id);
      console.log("Entered");  
   })
   console.log("numlist");
   console.log(numlist);
   console.log("ingredient_list")
   console.log(ingredient_list);  
   var numlistpass=JSON.stringify(numlist);
   var ingredientlistpass=JSON.stringify(ingredient_list);
   console.log('numlistpass');
   console.log(numlistpass);
   //const url1 = `http://localhost:5112/api/ingredient1/Get3`;
   const url1 = `http://localhost:5112/api/ingredient1/Get3?numlistpass=${ingredientlistpass}`;
   getData3(url1,numlist);
  
    // Clear search query and close dropdown after submit
    setSearchQuery('');
    setDropdownOpen(false);
  }
  

  const filteredOptions = ingredients.filter((option) =>
    option.ingredient_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <form className="flex justify-center text-center mt-10">
      <div className="relative w-80">
        <div className="flex flex-wrap border border-gray-300 rounded overflow-hidden">
          {selectedOptions.length > 0 && (
            <div className="flex flex-wrap items-center">
              {selectedOptions.map((option) => (
                <div
                  key={option.ingredient_id}
                  className="flex items-center bg-gray-200 rounded-full px-3 py-1 m-1"
                >
                  <span>{option.ingredient_name}</span>
                  <button
                    type="button"
                    className="ml-2 text-sm font-semibold text-gray-600"
                    onClick={() => handleOptionChange(option)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
          <input
            type="text"
            className="w-full px-4 py-3 text-md focus:outline-none"
            placeholder="Search Ingredients"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        {dropdownOpen && (
          <div className="absolute top-full left-0  max-h-60 overflow-y-scroll w-full bg-white border border-t-0 border-gray-300 rounded-b">
            {filteredOptions.map((option) => (
              <label
                key={option.ingredient_id}
                className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  className="mr-2"
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionChange(option)}
                />
                {option.ingredient_name}
              </label>
            ))}
          </div>
        )}
        <button
          type="button"
          className="absolute top-0 right-0 w-10 h-full flex items-center justify-center bg-gray-200 text-gray-600 focus:outline-none"
          onClick={toggleDropdown}
        >
          &#x25BC;
        </button>
      </div>
    </form>
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
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
         <img src={recipe.recipe_image} className="w-full block  " alt="image" />
       </div>
       <div className="recipe-text">
         <span className="recipe-publisher mr-20 text-md text-blue-700 font-medium">
             {recipe.recipe_name}
         </span>
         {/* <h4 className="recipe-title text-2xl truncate font-semibold text-red-500">
           {recipe.recipe_id}
         </h4> */}
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
        {recipes.length > visible && (
        <button className="mb-10 -mt-5 border  rounded-xl px-2 py-1  border-orange-700
         text-white bg-orange-700 hover:bg-white hover:text-orange-700 hover:border-orange-700" onClick={showMoreItems}>Load More</button>
        )}
        </div>
      </div>
  </>
  );
};

export default MenuContainer;
