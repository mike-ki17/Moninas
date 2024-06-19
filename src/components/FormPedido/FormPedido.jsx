import React from "react";
// import { useProductContext } from "../context/productContext.jsx";
import { useProductContext } from "../../context/productContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "@formspree/react";
import { BiCheckCircle } from "react-icons/bi";
import { useState } from "react";

import "./FormPedido.css";

function FormPedido() {
  const [state, handleSubmit, reset] = useForm("mjvnnqov");
  const { listProduct, subTotal, deleteProduct } = useProductContext();
  const navigation = useNavigate();

  const [check, setCheck] = useState(false)

  if (state.succeeded) {
    console.log("ENviado Yeah");  
  }

  const returnInit = function () {
    window.location.reload()
    navigation('/dash')    
  }

  useEffect(() => {
    if (listProduct.length == 0) {
      navigation("/dash");
    }
  }, [navigation]);

  const activeCheck = function () {
    setCheck(true)
  }

  return (
    <>
      <div className={check ? "container-WindowCheck" : 'container-WindowCheck-false'}>
        <div className="windowCheck">
          <div className="infoForm">
            <BiCheckCircle className="check" />
            <p>
              Tus datos han sido enviados correctamente, muy pronto nos
              pondremos en contacto contigo
            </p>
            <button onClick={returnInit}>Volver al inicio</button>
          </div>
        </div>
      </div>
      <div className="containerForm">
        <div className="contentForm">
          <div className="info-buy">
            <p>
              Ten en cuenta que los pedidos solo se realizan los fines de semana
            </p>
          </div>
          <form onSubmit={handleSubmit} className="formP">
            <input
              type="text"
              placeholder="Nombre Completo"
              className="inputP"
              name="nombre"
              id="nombre"
              required
            />
            <input
              type="text"
              placeholder="Número de telefono"
              className="inputP"
              name="telefono"
              id="telefono"
              required
            />
            {/* <p>Selecciona un día abil, minimo 3 dias para realizar el pedido</p>
            <input type="date" className="inputP" /> */}
            <input
              type="text"
              placeholder="Dirección de residencia"
              className="inputP"
              name="direccion"
              id="direccion"
              required
            />
            <textarea
              name="descripcion"
              id="descripcion"
              placeholder="Descripción de residencia, Ejemplo: casa, apartamento ..."
              className="inputP"
              required
            ></textarea>

            <input
              type="submit"
              className="btn-submit-buy"
              value={"Realizar pedido"}
              disabled={state.submitting}
              onClick={activeCheck}
            />
          </form>
        </div>
        <div className="verify-pedido">
          <h5 className="subtitle-pedido">Pedido</h5>
          <div className="producto-buy">
            {listProduct.map((item, index) => (
              // <h1 key={index}>{item.amount}</h1>
              <div className="card-shop" key={index}>
                <img src={`./src/img/${item.img}`} />
                <div className="item-data-shop">
                  <p className="item-name-shop">{item.name.toUpperCase()}</p>
                  <p className="item-price-shop">
                    $ {item.price * item.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="total-buy">
            <p>Total: ${subTotal} COP</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormPedido;
