import { useParams } from "react-router-dom";
import { useProductContext } from "../context/productContext.jsx";
import Nav from "../components/Nav/Nav.jsx";
import { useAuth } from "../context/authContext.jsx";
import Loader from "../components/Loader/Loader.jsx";
import Button from "../components/Button/Button.jsx";

import "../css/Product.css";

function Product() {
  const { user, loading, haldleLogout } = useAuth();

  if (loading) return <Loader />;

  const { OriginProducts } = useProductContext();
  const { id } = useParams();

  const product = OriginProducts[id];
  const priceProductAmount = product.price * product.amount;

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
              <div className="content-price-btn">
                <p className="price-product">${product.price}</p>
                <div className="container-btn-price">
                  <Button elem={product} id={id} style={"container-btn-id"} />
                  <div
                    className={
                      !product.show ? "remove-total-add" : "show-total-add"
                    }
                  >
                    <span>Total Agregado</span>
                    <span className="span-priceProductAmount">
                      $ {priceProductAmount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
