import { Link, useLocation } from "react-router-dom";
import './Header.css';


const Header = () => {

    const location = useLocation(); // Para obtener la ruta actual

    return (
        <header>
            <nav>
                <Link to="/" className={location.pathname === "/" ? "active" : ""}>Tu prestamo</Link>
                
                <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>Login</Link>
            </nav>
        </header>
    );
}

export default Header;