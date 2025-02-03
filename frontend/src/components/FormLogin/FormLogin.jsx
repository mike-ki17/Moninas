
import "../css/Register.css";
import { BiLogoGoogle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/authContext";


function FormLogin() {
  return (
    <div className="container-form">
            <form onSubmit={haldleSubmit} className="form-login">
              {error && <p className="error">{error}</p>}
              <h2>Regístrate en Monina's</h2>
    
              <a className="btn-auth-google">
                <BiLogoGoogle className="icon-auth-google" />Inicia sesión con Google
              </a>
    
              <hr className="divider-login sing-in" />
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="input-form"
                onChange={hadleChange}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="input-form"
                onChange={hadleChange}
              />
              
              <input type="submit" value="Crear cuenta" className="btn-submit" />
    
              <p className="info-sing-up">
                ¿Ya tienes cuenta? <Link to="/login">Iniciar Sesión</Link>
              </p>
              <p className="info-sing-up">
                <Link to="/">Volver al incio</Link>
              </p>
            </form>
          </div>
  )
}

export default FormLogin