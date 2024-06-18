import "../css/Login.css";
import { BiLogoGoogle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { app } from "../app/firebase.jsx";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { db } from "../app/firebase.jsx";
import { getDocs, collection } from "firebase/firestore";
function Login() {
  

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const verifyUser = async (email, password) => {

    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      if (doc.data().email == email && doc.data().password == password) {
        console.log("admin");
        navigate("/admin");
      }
      else{
        navigate("/dash");
      }
    });
  };


  const hadleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };


  const haldleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      verifyUser(user.email, user.password);
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
            <h2>Sign in to Monina's</h2>

            <a className="btn-auth-google" onClick={handleGoogleSingin}>
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
            <input type="submit" value="Sing in" className="btn-submit"/>

            <p className="info-sing-up">
              Don't have accont? <Link to="/register">Sing up</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
