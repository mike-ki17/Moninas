import "../css/Login.css";
import { BiLogoGoogle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const hadleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const haldleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/dash");
    } catch (error) {
      setError("Problemas al enviar formulario");
      console.log(error);
    }
  };

  const handleGoogleSingin = async () => {
    await loginWithGoogle();
    navigate("/dash");
  };

  return (
    <>
      <div className="container-login">
        <div className="container-frame">
          <Link to="/">
            <img src="./src/img/logo3.png" alt="" />
          </Link>
        </div>
        <div className="container-form">
          <form onSubmit={haldleSubmit} className="form-login">
            <h2>Iniciar sesión en Monina's</h2>

            <a className="btn-auth-google" onClick={handleGoogleSingin}>
              <BiLogoGoogle className="icon-auth-google" /> Inicia sesión con google
            </a>

            <hr className="divider-login sing-in" />

            <input
              type="email"
              placeholder="Correo"
              name="email"
              className="input-form"
              onChange={hadleChange}
            />
            <div className="content-password">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                name="password"
                className="input-pass"
                onChange={hadleChange}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                
              > 
              {showPassword ? <FiEye className="btn-pass"/> : <FiEyeOff className="btn-pass" />}
              </span>
            </div>
            <input type="submit" value="Iniciar sesión" className="btn-submit" />

            <p className="info-sing-up">
            ¿No tienes cuenta?<Link to="/register"> Regístrate</Link>
            </p>
            <p className="info-sing-up">
              <Link to="/">Volver al incio</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
