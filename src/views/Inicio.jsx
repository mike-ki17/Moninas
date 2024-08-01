import Nav from "../components/Nav/Nav.jsx";
import Card from "../components/Card/Card.jsx";
import { useAuth } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader.jsx";
import '../css/Inicio.css'
import Car from "../components/Car/Car.jsx";
import { useEffect } from "react";
function Inicio() {
  const { user, logout, loading } = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    if (user) {
      navigation("/dash");
    }
  }, [user, navigation]);
  if (loading) return <Loader />;


  return (
    <>
      <Nav display={true} />

      <div className="container-banner">
        <div className="content-banner">
          {/* <div className="copy">
            <h2>THE ULTIMATE LASAGNA HAVEN</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam autem, a harum nihil assumenda odio. Perferendis dignissimos voluptatibus enim magni.</p>
            <button>Ordenar ahora</button>
          </div>
          <img className="img-banner" src="./src/img/lasagnabannerDefault.png" alt="lasagna" /> */}
          <h2>THE BEST EMPANADA</h2>
          {/* <img className="img-banner" src="./src/img/BannerInicio.jpg" alt="" /> */}
        </div>
      </div>


     
      <div className="subtitle-container">
        <div className="subtite-content">
          <h4>Promociones</h4>
        </div>
      </div>
      <Card />
    </>
  );
}

export default Inicio;
