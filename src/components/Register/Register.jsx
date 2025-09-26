import { useState } from "react";
import "./Register.css";
import Header from "../Header/Header";

function Register() {
  const [document, setDocument] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ document, password, role })
      });

      if (response.status === 201) {
        alert("Usuario creado exitosamente");
      } else {
        alert("Error al crear usuario");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  return (
    
    <div className="register-container">
    <Headers/>
      <h2>Registrar usuario de prueba</h2>
      <input type="text" placeholder="Documento" value={document}onChange={(e) => setDocument(e.target.value)}/>
      <input type="password" placeholder="Contraseña"value={password}onChange={(e) => setPassword(e.target.value)}/>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="USER">Usuario</option>
        <option value="ADMIN">Administrador</option>
      </select>
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
}

export default Register;
