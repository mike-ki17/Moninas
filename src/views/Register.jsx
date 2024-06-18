import "../css/Register.css";
import { BiLogoGoogle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

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
        setError("Password should be at least 6 characters");
        throw new Error("Password should be at least 6 characters");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError('Problemas al enviar formulario')
      console.log(error)
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
          {error && <p className="error">{error}</p>}
          <h2>Sign up to Monina's</h2>

          <a className="btn-auth-google">
            <BiLogoGoogle className="icon-auth-google" /> Sign in with google
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
          <input type="submit" value="Create Account" className="btn-submit" />

          <p className="info-sing-up">
            Ya tienes cuenta? <Link to="/login">Sing in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
