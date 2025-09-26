import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import UserView from './components/View/UserView.jsx';
import AdminView from './components/View/AdminView.jsx';
import Register from './components/Register/Register';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onLogin={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            user && user.isAdmin ? (
              <AdminView document={user.document} password={user.password} />
            ) : (
              <Navigate to="/" />)}/>
        
        <Route
          path="/usuario"
          element={
            user && !user.isAdmin ? (
              <UserView document={user.document} password={user.password} />
            ) : (<Navigate to="/" />)}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;