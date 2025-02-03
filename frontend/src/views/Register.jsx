import "../css/Register.css";
import { BiLogoGoogle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";



import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);


  const { singup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const hadleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const haldleSubmit = async (e) => {
    e.preventDefault();
    try {
      await singup(user.email, user.password);
      if (user.password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres.");
        throw new Error("La contraseña debe tener al menos 6 caracteres.");
      } else {
        navigate("/");
      }
    } catch (error) {
      // setError("Problemas al enviar formulario");
      console.log(error);
    }
  };

  return (
    <div className="container-login">
      <div className="container-frame">
        <Link to="/">
          <img src="./src/img/logo3.png" alt="" />
        </Link>
      </div>
      <div className="container-form">
        <form onSubmit={haldleSubmit} className="form-login">
          <h2>Regístrate en Monina's</h2>

          <a className="btn-auth-google">
            <BiLogoGoogle className="icon-auth-google" />
            Inicia sesión con Google
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
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <FiEye className="btn-pass" />
              ) : (
                <FiEyeOff className="btn-pass" />
              )}
            </span>
          </div>
          {error && <p className="error">{error}</p>}

          <input type="submit" value="Crear cuenta" className="btn-submit" />

          <p className="info-sing-up">
            ¿Ya tienes cuenta? <Link to="/login">Iniciar Sesión</Link>
          </p>
          <p className="info-sing-up">
            <Link to="/">Volver al incio</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
