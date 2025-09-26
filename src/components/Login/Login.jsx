import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
  const [document, setDocument] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Usuarios quemados para pruebas locales
  const mockUsers = [
    { document: 'admin01', password: '123456', role: 'ADMIN' },
    { document: 'user123', password: '123456', role: 'USER' }
  ];

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ document, password })
      });

      if (response.status === 200) {
        const user = await response.json();

        localStorage.setItem("token", user.token);
        localStorage.setItem("role", user.role);
        localStorage.setItem("user_document", user.user_document);

        const isAdmin = user.role === 'ADMIN';
        onLogin({ document, password, isAdmin });

        navigate(isAdmin ? '/admin' : '/usuario');

      } else if (response.status === 401) {
        alert('Credenciales inválidas');
      } else {
        alert('Error inesperado del servidor');
      }
    } catch (error) {
      console.warn('Fallo conexión con backend. Usando modo prueba...');

      // Validación local si el backend falla
      const foundUser = mockUsers.find(
        (u) => u.document === document && u.password === password
      );

      if (foundUser) {
        const fakeToken = 'mocked-token-123';
        localStorage.setItem("token", fakeToken);
        localStorage.setItem("role", foundUser.role);
        localStorage.setItem("user_document", foundUser.document);

        const isAdmin = foundUser.role === 'ADMIN';
        onLogin({ document, password, isAdmin });

        navigate(isAdmin ? '/admin' : '/usuario');
      } else {
        alert('Credenciales inválidas (modo prueba)');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <input
        type="text"
        placeholder="Documento"
        value={document}
        onChange={(e) => setDocument(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
}

export default Login;
