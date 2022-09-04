import React, {Fragment, useEffect, useState} from 'react';
import { Outlet, Link } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes
} from "react-router-dom";
import "./App.css";

//pages
import Layout from './pages/Layout';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  async function isAuth() {
    try {
      
      const response = await fetch("http://localhost:3001/auth/verify", {
        method:"GET",
        headers: {token : localStorage.token}
      });

      const parseRes = await response.json();

      console.log(parseRes);

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Routes>
            <Route exact path="/login" element={!isAuthenticated ? <Login setAuth = {setAuth} />: <Navigate to="/home" />} />
            <Route exact path="/register" element={!isAuthenticated ? <Register setAuth = {setAuth}/> : <Navigate to="/home" />} />
            <Route exact path="/home" element={isAuthenticated ? <Home setAuth = {setAuth}/> : <Login setAuth = {setAuth}/>} />
          </Routes>
        </div>
      </Router>
    </Fragment>
  )
}

export default App;