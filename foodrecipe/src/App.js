import { Header, MainContainer, MenuContainer } from './components';
import { useEffect, useRef, useState } from "react";
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from "framer-motion";
import {CreateContainer} from './components';
import { Route, Routes,useNavigate,useLocation} from "react-router-dom";
import Footer from './components/Footer';
import Details from './components/Details';
import RecipeLists from './components/RecipeLists';
import RecipeItem from './components/RecipeItem';
import LoginForm from './components/LoginForm';
import Ingredients from './components/Ingredients';
import {StateContext} from './components/StateContext';
import { AuthProvider } from './components/AuthContext';
import OtpPage from './components/OtpPage';
import Success from './components/success';
import {LoginProvider} from './components/LoginContext';
import Reset from './components/Reset';
import Profile from './components/Profile';
import Contact from './components/Contact';
import Favourites from './components/Favourites';
import Recipe from './components/Recipe';
import Order from './components/Order';
function App() {
  const input = useRef(null);
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const [searchItem, setSeachItem] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const url = `http://localhost:5112/api/recipe/Get1?recipe_name=${searchItem}`;
  const [saveItem, setsaveItem] = useState(() => {
    const localData = localStorage.getItem("recipeData");
    return localData ? JSON.parse(localData) : [];
  });
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();

    //api call
    getData(searchItem);

    input.current.blur();
    setSeachItem("");
    setRecipes([]);
    setError("");
    navigate("/");
  };
  const handleFavourites = (id) => {
    fetch( `http://localhost:5112/api/ingredient1?recipe_id=${id}`)
      .then((response) => response.json())
            .then((json) => {
              console.log(json[0])
              checkLocalData(json[0])
              })
    navigate("/favourites");
  };
  const getData = async () => {
    try {
      setLoading(true);
      fetch(url)
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
  const checkLocalData = (data) => {
    const localData = JSON.parse(localStorage.getItem("recipeData"));
    const existingData = localData?.some((item) => item.id === data.id);

    if (!existingData) {
      setsaveItem([...saveItem, data]);
    } else {
      const filterData = localData.filter((item) => item.id !== data.id);
      setsaveItem(filterData);
    }
  };
  useEffect(() => {
    if (window.localStorage.getItem("isLoggedIn")) {
      window.localStorage.setItem("isLoggedIn", 'No');
    }
    console.log("isAuthenticated")
    console.log(isAuthenticated)
    localStorage.setItem("recipeData", JSON.stringify(saveItem));
  }, [saveItem]);
  const meal=['beef','chicken'];
  const singleMeal = {
    id: meal[0]?.idMeal,
    title: meal[0]?.strMeal,
    category: meal[0]?.strCategory,
    area: meal[0]?.strArea,
    thumbnail: meal[0]?.strMealThumb,
    instructions: meal[0]?.strInstructions,
    source: meal[0]?.strSource,
    tags: meal[0]?.strTags,
    youtube: meal[0]?.strYoutube,
  }
  const location = useLocation();

  // Define routes where the header and footer should not be displayed
  const hideHeaderFooterRoutes = ['/login','/otp','/reset'];
  return (
    <div className={hideHeaderFooterRoutes.includes(location.pathname) ? '' : 'w-screen h-auto flex flex-col bg-primary'}>
      <StateContext>
        <AuthProvider isAuthenticated={isAuthenticated}>
        <LoginProvider>
      {!hideHeaderFooterRoutes.includes(location.pathname) && <Header isAuthenticated={isAuthenticated}/>}
      <Toaster/>
      <main className='mt-14 md:mt-20 px-4 md:px-16 py-4 w-full'>
        <Routes>
          <Route path="/" element={<MainContainer />} />
          <Route path="/explore" element={<MenuContainer />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/recipes/:searchItem" element={<RecipeLists />} />
          <Route path="/recipe-item/:recipe_id" element={<RecipeItem handleFavourites={handleFavourites} saveItem={saveItem}/>} />
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/otp" element={<OtpPage/>} />
          <Route path="/reset" element={<Reset/>}/>
          <Route path="/success" element={<Success/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/orders" element={<Order/>} />
        </Routes>
      </main>
      {!hideHeaderFooterRoutes.includes(location.pathname) && <Footer />}
      </LoginProvider>
      </AuthProvider>
      </StateContext>
    </div>
    // <div className="w-screen h-auto flex flex-col bg-primary">
    //   <Header/>
    //   <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
    //       <Routes>
    //         <Route path="/" element={<MainContainer/>} />
    //         <Route path="/explore" element={<MenuContainer />} />
    //         <Route path="/favourites" element={<CreateContainer/>} />
    //         <Route path="/recipes/:searchItem" element={<RecipeLists searchItem={searchItem}/>} />
    //         <Route path="/recipe-item/:recipe_id" element={<RecipeItem handleFavourites={handleFavourites} saveItem={saveItem}/>}/>
    //         <Route path="/login" element={<LoginForm/>}/>
    //       </Routes>
    //     </main>
    //     <Footer/>
    // </div>
  );
}

export default App;
