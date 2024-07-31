import { NavLink } from "react-router-dom";
import Logo from "../../img/logo.png";
import { BiCartAlt } from "react-icons/bi";
import Car from "../Car/Car.jsx";
import { useCarContext } from "../../context/showCar";
import { useProductContext } from "../../context/productContext.jsx";
import { BiMenuAltRight } from "react-icons/bi";
import "./Nav.css";
import { useState } from "react";
function Nav({ photo, logOut, name, display }) {
  const { showCar, handleCar } = useCarContext();
  const { listProduct } = useProductContext();
  const [showMenuMovil, setShowMenuMovil] = useState(false);

  const handleMenu = () => {
    showMenuMovil ? setShowMenuMovil(false) : setShowMenuMovil(true);
  };

  return (
    <div className="container-nav">
      <nav className="nav-movile">
        <ul className="nav-list">
          <li>
            <img src={Logo} alt="Moninas" className="logo" />
          </li>
        </ul>
        <ul className="nav-funcion">
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
          <img
            src={photo}
            alt=""
            className={display ? "user-session" : "photo-user"}
          />
        </ul>
      </nav>

      <div className={showMenuMovil ? "display_menu" : "ocult_menu"}>
        <div className="routes">
          <ul className="nav-list-movil">
            <li>
              <NavLink to="/" className="link-movil">
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/productos" className="link-movil">
                Productos
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacto" className="link-movil">
                Contacto
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="functions">
          <ul className="nav-funcion-menuMovile">
          <NavLink to="/login" className={display ? "log-in" : "user-session"}>
            Log in
          </NavLink>
          <NavLink
            to="/register"
            className={display ? "sing-up" : "user-session"}
          >
            Sing up
          </NavLink>
          
          <NavLink
            to="/login"
            className={display ? "user-session" : "sing-up"}
            onClick={logOut}
          >
            log out
          </NavLink>
          
        </ul>
        </div>
      </div>
      <nav className="nav-principal">
        <ul className="nav-list">
          <img src={Logo} alt="Moninas" className="logo" />
          <li className="initial">
            <NavLink to="/" className="link">
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/productos" className="link">
              Productos
            </NavLink>
          </li>
          <li>
            <NavLink to="/contacto" className="link">
              Contacto
            </NavLink>
          </li>
        </ul>
        <ul className="nav-funcion">
          <NavLink to="/login" className={display ? "log-in" : "user-session"}>
            Log in
          </NavLink>
          <NavLink
            to="/register"
            className={display ? "sing-up" : "user-session"}
          >
            Sing up
          </NavLink>
          <img
            src={photo}
            alt=""
            className={display ? "user-session" : "photo-user"}
          />
          <p className={display ? "user-session" : "log-in"}>{name}</p>
          <NavLink
            to="/login"
            className={display ? "user-session" : "sing-up"}
            onClick={logOut}
          >
            log out
          </NavLink>
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
        </ul>
      </nav>
      {showCar && <Car />}
    </div>
  );
}

export default Nav;
