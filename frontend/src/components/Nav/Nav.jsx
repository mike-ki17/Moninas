import { NavLink } from "react-router-dom";
import { useCarContext } from "../../context";
import Logo from "../../img/logo.png";

// Componente extra
import Car from "../Car/Car.jsx";

// Sub Componentes del NAV
import { NavCarButton } from "./index.js";
import { NavOptionsUser } from "./index.js";
import { NavMovile } from "./index.js";

import "./Nav.css";

function Nav({ photo, logOut, name, display }) {
  const { showCar } = useCarContext();

  return (
    <div className="container-nav">
      <NavMovile photo={photo} display={display} logOut={logOut} name={name}/>

      <nav className="nav-principal">
        <ul className="nav-list">
          <NavLink to="/" className="link">
            <img src={Logo} alt="Moninas" className="logo" />
          </NavLink>
          <li className="initial">
            <NavLink to="/" className="link">
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/contacto" className="link">
              Contacto
            </NavLink>
          </li>
        </ul>

        <div className="rigth-nav">
          <NavOptionsUser
            name={name}
            photo={photo}
            logOut={logOut}
            display={display}
          />

          <NavCarButton />
        </div>
      </nav>

      {/* Solo si se detefcta que se acciono el boton de --NavCarButton-- se mostrara la seccion del carrito de compras */}
      {showCar && <Car />}
    </div>
  );
}

export default Nav;
