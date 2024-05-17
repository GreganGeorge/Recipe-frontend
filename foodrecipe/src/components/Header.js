import React, { useState ,useRef} from "react";
import { MdShoppingBasket, MdAdd, MdLogout, MdArrowDropDownCircle, MdArrowDropDown } from "react-icons/md";
import { motion } from "framer-motion";
import { useLocation,useNavigate} from "react-router-dom"
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar"
import SearchResultList from "./SearchResultList"
import  variables  from './Variables';
import { FaSearch } from "react-icons/fa";
import LoginForm from "./LoginForm";
import { AiOutlineShopping, AiOutlineUser } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "./StateContext";
import { useAuth } from './AuthContext'; 
const Header = () => {
  const { loggedIn, logout } = useAuth(); 
  const [dropDown,setDropDown]=useState(false);
  const {showCart,setShowCart,totalQuantities}=useStateContext();
  const [loggedOrNot,setLoggedOrNot]=useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [results, setResults] = useState([]);
  const input = useRef(null);
  const [searchItem, setSeachItem] = useState("");
  const [recipes, setRecipes] = useState([]);
  const location = useLocation();
  const [val,setVal]=useState('')
  const navigate = useNavigate();
  const [menu,setMenu]=useState('')
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isHomePage = location.pathname === '/';
  const [selectedrecipeid,setSelectedrecipeid]=useState(0);
  const url = `http://localhost:5112/api/recipe/Get1?recipe_name=${searchItem}`;
  function logout1(){
    setLoggedOrNot(false);
    window.localStorage.setItem("isLoggedIn", 'No');
    setDropDown(!dropDown);
  }
  function droplogout(){
    setDropDown(false);
  }
  function drop(){
    setDropDown(!dropDown);
  }
  const handleSearch = (e) => {
    setMenu('');
    if(searchItem)
    {
    e.preventDefault();
    //getData(searchItem);
    input.current.blur();
    setSeachItem("");
    setRecipes([]);
    setError("");
    //navigate("/recipes/${searchItem}");
    navigate(`/recipes/${searchItem}`);
    }
  };
  // const getData = async () => {
  //   try {
  //     setLoading(true);
  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((json) => {
  //         setRecipes(json);
  //         console.log('json');
  //         console.log(json);
  //       });
  //     setLoading(false);
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };
    const links = [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Explore",
            path: "/explore",
        },
        {
            name: "Favourites",
            path: "/favourites",
        },
        {
          name:"Ingredients",
          path:"/ingredients"
        },
        {
          name:"Contact",
          path:"/contact"
        }
    ]
    function handle(event){
      setMenu(event.target.text)
      console.log(event)
    }
    const fetchData = (value) => {
      fetch(variables.API_URL+'recipe1/Get')
        .then((response) => response.json())
        .then((json) => {
          setResults(json);
          console.log(results)
        });
    };
    React.useEffect(() => {
      if (window.localStorage.getItem("isLoggedIn")) {
        console.log('window.localStorage.getItem("isLoggedIn")');
        console.log(window.localStorage.getItem("isLoggedIn"));
        if(window.localStorage.getItem("isLoggedIn")=='Yes')
        {
          setLoggedOrNot(true);
        }
      }

      fetchData();
      if(menu==''){
        setMenu('Home')
      }
    }, []);
    
  
  return (
    <header className="fixed flex z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          {/* <img src={Logo} className="w-8 object-cover" alt="logo" /> */}
          <p className="font-bold text-center text-2xl">
                        Tasty<span className="text-green-500 text-2xl">Byte</span>
                    </p>
        </Link>
        {/* <div className="main">
            <input list="data" onChange={(e)=>setVal(e.target.value)} placeholder="Search" />
            <datalist id="data">
                {data.map((op)=><option>{op}</option>)}
            </datalist>

        </div> */}
        <form className="search-bar" onSubmit={handleSearch}>
          {isHomePage &&(<>
        <input
          type="search"
          ref={input}
          value={searchItem}
          onChange={(e) => setSeachItem(e.target.value)}
          className="bg-white/75 p-3 px-8 rounded-full outline-none lg:w-96 shadow-lg shadow-red-100 focus:shadow-red-200 "
          placeholder="Find a Recipe"
        />
        </>
      )
        } 
      </form>
        {/* {menu=='Home' &&(<>
        <div className="input-wrapper">
         <FaSearch id="search-icon" />
            <input list="results" onChange={(e)=>{console.log(e.target.value);setVal(e.target.value)}} placeholder="Search" />
            <datalist id="results">
                {results.map((op)=><option onChange={(e)=>{console.log(e);setSelectedrecipeid(op.recipe_id)}}>
          {op.recipe_name}</option>)}
            </datalist>
        </div>
        <Link
        to={`/recipes`}
        className="text-sm p-1.5 mt-1 mb-1 -ml-60 px-8 rounded-lg uppercase font-medium tracking-wider inline-block shadow-md bg-black text-white"
      >
        Search
      </Link>
      </>
      )
        } */}
        
        {/* <div className="search-bar-container ">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultList results={results} />}
      </div>  */}
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-24 "
          >
            {/* <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Menu
            </li>
            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              About Us
            </li>
            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Service
            </li> */}
            <div className=" text-xl text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer ">
                <div className=" nav-links">
                    { links.map(link => (
                        <Link onClick={(event) => handle(event)} className={location.pathname === link.path ? "active" : ""} to={link.path} key={link.name}>{link.name}</Link>
                    )) }
                </div>
            </div>
            
          </motion.ul>
          <button type="button" className="cart-icon" onClick={()=>setShowCart(true)}>
            <AiOutlineShopping/>
            <span className="cart-item-qty">{totalQuantities}</span>
          </button>
          {showCart && <Cart/>}
          {/* <div
            className="relative flex items-center justify-center ml-40"
          >
            <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
              <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              </div> 
          </div> */}


          {/* <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userprofile"
              onClick={login}
            />
          </div> */}
          {/* <Link onClick={(event) => handle(event)} to={`/login`} key={`/login`}>Login</Link> */}
          <div className=" text-xl text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer ">
                <div className=" nav-links">
          {loggedIn==true ? <div className='flex' onClick={drop}><AiOutlineUser className=" size-6 mr-0.5"/>Account</div> : <Link to="/login">Login</Link>}
          {dropDown && <div className="flex mt-3 -ml-10 flex-col dropDownProfile">
                          <ul className="flex flex-col">
                            <Link to='/profile' onClick={droplogout}>Profile</Link>
                            <Link to='/orders' onClick={droplogout}>Orders</Link>
                            <li className='ml-4' onClick={()=>{logout();droplogout();}}>LOG OUT</li>
                          </ul>
                        </div>}
          </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;