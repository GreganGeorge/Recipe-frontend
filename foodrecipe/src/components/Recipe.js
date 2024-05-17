import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

const Recipe = ({ recipe_id }) => {
  const [recipes,setRecipes]=useState([])
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const getData = async (url) => {
    try {
      setLoading(true);
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          setRecipes(json);
        });
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };
useEffect(() => {
    const url = `http://localhost:5112/api/Favourite/Get1?recipe_id=${recipe_id}`;
    getData(url);
  }, [recipe_id]);
  return (
    <div className="recipe flex flex-col w-80  overflow-hidden p-5 bg-white/75 shadow-xl shadow-red-100 gap-5 border-2 rounded-2xl border-white">
      <div className="recipe-img h-40 flex justify-center  overflow-hidden items-center rounded-xl">
        <img src={recipes.recipe_image} className="w-full block  " alt="" />
      </div>
      <div className="recipe-text">
        <h4 className="recipe-title text-2xl truncate font-semibold text-red-500">
          {recipes.recipe_name}
        </h4>
        <Link
          to={`/recipe-item/${recipes.recipe_id}`}
          className="text-red-50 p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-2 bg-gradient-to-br from-red-400 to-red-500  inline-block  shadow-md  shadow-red-200 hover:shadow-lg hover:shadow-red-300 "
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default Recipe;
