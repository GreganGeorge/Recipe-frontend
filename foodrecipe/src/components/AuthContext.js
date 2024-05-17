import React, { createContext, useState, useContext } from 'react';
import { useLocation,useNavigate} from "react-router-dom"
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children ,isAuthenticated}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [loggedIn, setLoggedIn] = useState(isAuthenticated);
    const login = (email,login_id) => {
      setLoggedIn(true);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('email', email);
      localStorage.setItem('login_id', login_id);
        setEmail(email);
    };
  
    const logout = () => {
      setLoggedIn(false);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('email');
      navigate('/');
    };
  
    return (
      <AuthContext.Provider value={{ loggedIn, login, logout,email }}>
        {children}
      </AuthContext.Provider>
    );
  };

export default AuthContext;
