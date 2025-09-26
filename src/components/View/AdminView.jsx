import { useEffect, useState } from "react";
import "../View/View.css"


function AdminView() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("token");
    axios.get("http://localhost:8080/api/loans", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setLoans(res.data))
      .catch(err => console.error(err));
  }, []);
  console.log("Renderizando AdminView");

  return (

    <div>
      <h2>Todos los préstamos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha Préstamo</th>
            <th>Fecha Devolución</th>
            <th>Devuelto</th>
            <th>Documento Usuario</th>
          </tr>
        </thead>
        <tbody>
          {loans.map(loan => (
            <tr key={loan.id}>
              <td>{loan.id}</td>
              <td>{loan.loan_date}</td>
              <td>{loan.return_date}</td>
              <td>{loan.returned ? "Sí" : "No"}</td>
              <td>{loan.user_document}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminView;
