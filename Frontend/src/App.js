import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import List from './pages/list/List';
import Hotel from './pages/hotel/Hotel';
import LoginPage from './pages/login/Login2';
import Reservations from './pages/reservations/Reservations';
import PrivateRoute from './components/PrivateRoute';


import "./styles/index.scss";
import SingUpPage from './pages/signup/SignUp';

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(!!sessionStorage.getItem('authenticatedUser'));

  return (
    <Router>
      <Routes>
        
      <Route path="/" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <List />
          </PrivateRoute>
        }/>
        <Route path="/estivages" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <List />
          </PrivateRoute>
        }/>
        <Route path="/estivage/:id" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Hotel />
          </PrivateRoute>
        }/>
        <Route path="/login" element={<LoginPage setisLoggedIn={setisLoggedIn} />}/>
        <Route path="/signup" element={<SingUpPage setisLoggedIn={setisLoggedIn} />}/>

        <Route path="/reservations" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Reservations />
          </PrivateRoute>
        }/>
      </Routes>
    </Router>
  );
}

export default App;
