import "./Car.css";
import { BiSolidError } from "react-icons/bi";
import { BiXCircle } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";
import { BiMinus } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useCarContext } from "../../context/showCar";
import { useProductContext } from "../../context/productContext.jsx";
import CounterProducts from "../CounterProducts/CounterProducts.jsx";
import { useNavigate } from "react-router-dom";

function Car() {
  const navigation = useNavigate();
  const { showCar, handleCar } = useCarContext();
  const {
    listProduct,
    subTotal,
    setAmount,
    handleAmountItem,
    deleteProduct,
    verifyAmountProduct,
  } = useProductContext();

  const handleAmount = (e) => {
    e.target.value = 0;
    setAmount(e.target.value);
  };

  const makePedido = () => {
    handleCar()
    navigation("/Pedido")
  }

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
                <Link to="/" className="link-car-return" onClick={handleCar}>
                  Volver a la vitrina
                </Link>
              </div>
            ) : (
              <div className="content-compras-listProducts">
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
                          deleteProduct(subTotal, m.price, m.amount, index);
                        }}
                      />
                    </div>
                    <div className="item-data">
                      <p className="item-name">{m.name.toUpperCase()}</p>
                      <p className="item-price">$ {m.price * m.amount}</p>
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
              <p>Subtotal: $ {parseFloat(subTotal.toFixed(3))}</p>
              <button onClick={makePedido}>Hacer pedido</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Car;
