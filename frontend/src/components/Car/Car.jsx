
import { useCarContext } from "../../context/showCar";
import { useProductContext } from "../../context/productContext.jsx";
// Componente extra
import CounterProducts from "../CounterProducts/CounterProducts.jsx";
// Iconos
import { BiSolidError } from "react-icons/bi";
import { BiXCircle } from "react-icons/bi";
// Componentes de React
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Car.css";

function Car() {
  const navigation = useNavigate();
  const { showCar, handleCar } = useCarContext();
  const {
    listProduct,
    subTotal,
    deleteProduct,
  } = useProductContext();

  // Resirección a la pagina de padedi
  const makePedido = () => {
    handleCar()
    navigation("/Pedido")
  }
  const formatNumber = (num) => {
    return Number(num).toLocaleString('es-ES');
  };

  return (
    <>
      {showCar && (
        <div className="container-car">
          <div className="content-car">
            <div className="title-seccion">
              <h2>Carrito de compras</h2>

              <BiXCircle className="icon-close" onClick={handleCar} />
            </div>
            {listProduct.length === 0 ? (
              <div className="content-compras">
                <BiSolidError className="icon-not-content" />
                <p>No has agregado productos a tu carrito. Agrega productos </p>
                <p className="link-car-return" onClick={handleCar}>
                  Volver a la vitrina
                </p>
              </div>
            ) : (
              <div className="content-compras-listProducts">
                {/* Se listas los productos previamente agregados mediante el componente Button */}
                {listProduct.map((m, index) => (
                  <div key={m.id} className="item-buy">
                    <div className="item-container-img">
                      <img
                        src={`/src/img/${m.img}`}
                        alt={m.name}
                        className="item-img"
                      />
                      <BiXCircle
                        className="item-delete"
                        onClick={() => {
                          deleteProduct(index);
                        }}
                      />
                    </div>
                    <div className="item-data">
                      <p className="item-name">{m.name.toUpperCase()}</p>
                      <p className="item-units">X{m.units*m.amount} unidades</p>
                      <p className="item-price">$ {formatNumber(m.price * m.amount)}</p>
                    </div>
                    <CounterProducts
                      price={m.price}
                      amount={m.amount}
                      index={index}
                      subTotal={subTotal}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="container-subtotal">
              <p>Subtotal: $ {formatNumber(parseFloat(subTotal.toFixed(3)))}</p>
              <button onClick={makePedido}>Hacer pedido</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Car;
