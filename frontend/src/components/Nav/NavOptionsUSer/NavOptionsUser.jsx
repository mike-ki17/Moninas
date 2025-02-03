import { useEffect } from "react";
import { NavLink } from "react-router-dom";

function NavOptionsUser( {name, photo, logOut, display} ) {
  return (
    <ul className="nav-funcion">
      <NavLink to="/login" className={display ? "log-in" : "user-session"}>
        Inicia sesión
      </NavLink>
      <NavLink to="/register" className={display ? "sing-up" : "user-session"}>
        Registrarse
      </NavLink>
      <img
        src={photo}
        alt=""
        className={display ? "user-session" : photo == null ? "user-session" : "photo-user"}
      />
      <p className={display ? "user-session" : "name-user"}>{name}</p>
      <NavLink
        to="/login"
        className={display ? "user-session" : "sing-up"}
        onClick={logOut}
      >
        Cerrar sesión
      </NavLink>
    </ul>
    
  );
}

export default NavOptionsUser;
