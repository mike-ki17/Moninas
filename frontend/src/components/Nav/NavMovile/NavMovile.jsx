import Logo from "../../../img/logo.png";
import { BiCartAlt } from "react-icons/bi";
import { BiMenuAltRight } from "react-icons/bi";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import { useCarContext } from "../../../context";
import { useProductContext } from "../../../context";

import NavOptionsUser from "../NavOptionsUSer/NavOptionsUser";

// import "../NavMovile/NavMovile.css"

function NavMovile({ photo, display, logOut, name}) {
  const { showCar, handleCar } = useCarContext();
  const { listProduct } = useProductContext();
  const [showMenuMovil, setShowMenuMovil] = useState(false);

  const handleMenu = () => {
    showMenuMovil ? setShowMenuMovil(false) : setShowMenuMovil(true);
  };

  return (
    <nav className="nav-movile">
      <ul className="nav-list">
        <li>
          <img src={Logo} alt="Moninas" className="logo" />
        </li>
      </ul>
      <ul className="nav-funcion">
        <img
          src={photo}
          alt=""
          className={display ? "user-session" : photo == null ? "user-session" : "photo-user"}
        />
        <p className={display ? "user-session" : photo == null ? "name-corto" : "user-session"}>{name}</p>

        <button className="container-btn-car" onClick={handleCar}>
          <BiCartAlt className="btn-car" />
          <span
            className={
              listProduct.length == 0 ? "not-counter-car" : "counter-car"
            }
          >
            {listProduct.length}
          </span>
        </button>

        <BiMenuAltRight className="btn-menu" onClick={handleMenu} />
      </ul>

      {showMenuMovil ? (
        <div className="nav-movil-functions">
          <ul className="list-nav-movil">
            <li>
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

          <div className="nav-movil-options-user">
            <NavOptionsUser logOut={logOut} display={display}  />
          </div>
        </div>
      ) : (<div className="not-show"></div>)}
    </nav>
  );
}

export default NavMovile;
