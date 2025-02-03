import "./Card.css";

import { Link } from "react-router-dom";
import { useProductContext } from "../../context/productContext.jsx";
import Button from "../Button/Button.jsx";
import { useEffect } from "react";

function Card() {
  const formatNumber = (num) => {
    return Number(num).toLocaleString("es-ES");
  };
  const { OriginProducts } = useProductContext();

  return (
    <div className="container-card ">
      <div className="content-card col-5 med-col-3 peq-col-1">
        {/* Listado de productos existentes del origen, no agregados en la lista de pedidos */}
        {OriginProducts.map((m, index) => (
          <div className="card" key={m.id}>
            <div className="product-item">
              <span className={m.units <= 1 ? "unit-info-not-units" : "unit-info"}>{`X${m.units} units`}</span>
              <Link to={`/product/${index}`} className="link_">
                <div className="product">
                  <img
                    src={`/img/${m.img}`}
                    alt=""
                    className="img-product"
                  />
                </div>
                <div className="product-detail">
                  <div className="product-info">
                    <p className="card-price">{`$ ${formatNumber(m.price)}`}</p>
                    <p className="card-name">{m.name.toUpperCase()}</p>
                  </div>
                </div>
              </Link>
              <Button elem={m} id={index} style={"container-btn-counter"} />
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
}

export default Card;
