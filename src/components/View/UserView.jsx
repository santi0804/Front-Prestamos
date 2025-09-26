import { useEffect, useState } from "react";
import "../View/View.css"


function UserView() {
  const [loans, setLoans] = useState([]);
  const userDocument = localStorage.getItem("user_document");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`http://localhost:8080/api/loans/user/${userDocument}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setLoans(res.data))
    .catch(err => console.error(err));
  }, [userDocument]);

  return (
    <div>
      <h2>Mis préstamos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha Préstamo</th>
            <th>Fecha Devolución</th>
            <th>Devuelto</th>
          </tr>
        </thead>
        <tbody>
          {loans.map(loan => (
            <tr key={loan.id}>
              <td>{loan.id}</td>
              <td>{loan.loan_date}</td>
              <td>{loan.return_date}</td>
              <td>{loan.returned ? "Sí" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserView;
