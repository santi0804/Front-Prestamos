import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./components/Login/Login";
import UserView from './components/UserView';
import AdminView from './components/AdminView';
import Header from './components/Header/Header';

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        {/* Ruta de login */}
        <Route path="/" element={<Login onLogin={setUser} />} />

        {/* Ruta protegida para usuarios normales */}
        <Route
          path="/usuario"
          element={
            user && !user.isAdmin ? (
              <UserView document={user.document} password={user.password} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Ruta protegida para administradores */}
        <Route
          path="/admin"
          element={
            user && user.isAdmin ? (
              <AdminView document={user.document} password={user.password} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
