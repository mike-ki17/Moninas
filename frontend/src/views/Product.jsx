import { useParams } from "react-router-dom";
import { useProductContext } from "../context/productContext.jsx";
import { useAuth } from "../context/authContext.jsx";

// Componentes extras
import Nav from "../components/Nav/Nav.jsx";
import Loader from "../components/Loader/Loader.jsx";
import Button from "../components/Button/Button.jsx";
import Card from "../components/Card/Card.jsx"

import "../css/Product.css";
import { useEffect } from "react";

function Product() {
  const { user, loading, haldleLogout } = useAuth();

  if (loading) return <Loader />;

  const { OriginProducts } = useProductContext();
  const { id } = useParams();

  const product = OriginProducts[id];
  const priceProductAmount = product.price * product.amount;

  const formatNumber = (num) => {
    return Number(num).toLocaleString("es-ES");
  };

  return (
    <>
      <Nav
        photo={user.photoURL}
        logOut={haldleLogout}
        name={user.displayName || user.email}
        display={false}
      />

      <div className="container-product-item">
        <div className="content-product-id grid col-2 med-col-1">
          <div className="container-img-prodcut-id">
            <img src={`/src/img/${product.img}`} alt="" />
          </div>
          <div className="container-data-product-id">
            <div className="product-info-id">
              <p className="name-product">{product.name.toUpperCase()}</p>
              <div className="space">
                <hr />
              </div>
              <div className="container-info-product">
                <div className="content-price">
                  <p>X{product.units * product.amount} units</p>
                  <p className="price-product">
                    ${formatNumber(product.price)}
                  </p>
                </div>
                <div className="content-btn-contenproduct">
                  <div className="container-btn-price">
                    <Button elem={product} id={id} style={"container-btn-id"} />
                    <div
                      className={
                        !product.show ? "remove-total-add" : "show-total-add"
                      }
                    ></div>
                  </div>
                  <div
                    className={
                      !product.show ? "remove-total-add" : "show-total-add"
                    }
                  >
                    <p className="span-priceProductAmount">
                      Total agregado ${formatNumber(priceProductAmount)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Card />
      {useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, [product.id])}
    </>
  );
}

export default Product;
