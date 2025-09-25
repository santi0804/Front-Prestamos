import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
  const [document, setDocument] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const from = '2025-01-01T00:00:00';
    const to = '2025-12-31T23:59:59';

    try {
      const response = await fetch(`http://localhost:8080/loans/loan?from=${from}&to=${to}`, {
        method: 'GET',
        headers: {
          'document': document,
          'password': password
        }
      });

      if (response.status === 200) {
        const data = await response.json();
        const isAdmin = data.length > 0; // lógica temporal
        onLogin({ document, password, isAdmin });
        navigate(isAdmin ? '/admin' : '/usuario');
      } else if (response.status === 401) {
        alert('Credenciales inválidas');
      } else {
        alert('Error inesperado del servidor');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      alert('No se pudo conectar con el servidor');
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
