import React from "react";
import { useProductContext } from "../../context/productContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "@formspree/react";
import { BiCheckCircle } from "react-icons/bi";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import "./FormPedido.css";

function FormPedido() {
  const [state, handleSubmit, reset] = useForm("mjvnnqov");
  const { listProduct, subTotal, setListProduct } = useProductContext();
  const navigation = useNavigate();
  const { user } = useAuth();
  const correo = user.email;
  const [pedido, setPedido] = useState([]);
  const agregarDetallesPedido = () => {
    let nuevosDetalles = [];

    listProduct.forEach((p) => {
      // Aquí copias los detalles que deseas (por ejemplo, name, price, etc.)
      nuevosDetalles.push({
        name: p.name,
        price: p.price * p.amount, // Multiplicamos el precio por la cantidad
        unidades: p.amount * p.units, // Calculamos las unidades
      });
    });

    setPedido(nuevosDetalles); // Actualizas el estado con los nuevos detalles
  };
  const [check, setCheck] = useState(false);
  const [errors, setErrors] = useState({});

  const returnInit = function () {
    setListProduct([]);
    window.location.reload();
  };

  useEffect(() => {
    if (listProduct.length == 0) {
      navigation("/dash");
    }
    agregarDetallesPedido();
  }, [listProduct]);

  const activeCheck = function () {
    setCheck(true);
  };

  const handleButtonClick = (event) => {
    // event.preventDefault();
    if (validateForm()) {
      activeCheck();
    }
  };

  const validateForm = () => {
    let formErrors = {};
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const direccion = document.getElementById("direccion").value;
    const descripcion = document.getElementById("descripcion").value;

    if (!nombre) formErrors.nombre = "El nombre es requerido";
    if (!telefono) formErrors.telefono = "El teléfono es requerido";
    if (!direccion) formErrors.direccion = "La dirección es requerida";
    if (!descripcion) formErrors.descripcion = "La descripción es requerida";

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const formatNumber = (num) => {
    return Number(num).toLocaleString("es-ES");
  };
  const handleSubmitBabkend = async (e) => {
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const direccion = document.getElementById("direccion").value;
    const descripcion = document.getElementById("descripcion").value;
    const pedidoJSON = JSON.stringify(pedido);

    e.preventDefault();

    axios
      .post("http://127.0.0.1:5000/pedidos", {
        nombre,
        telefono,
        direccion,
        descripcion,
        correo,
        pedidoJSON,
      })
      .then((respuesta) => console.log(respuesta.data['mensaje']))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <div
        className={
          check ? "container-WindowCheck" : "container-WindowCheck-false"
        }
      >
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
      <div className={check ? "containerForm_ocult " : "containerForm"}>
        <div className="contentForm">
          <div className="info-buy">
            <p>Pago contra entrega - Domicilios GRATIS</p>
          </div>
          <form onSubmit={handleSubmitBabkend} className="formP">
            <input
              type="text"
              placeholder="Nombre Completo"
              className="inputP"
              name="nombre"
              id="nombre"
              required
            />
            {errors.nombre && (
              <p className="error-form-pedido">{errors.nombre}</p>
            )}
            <input
              type="email"
              placeholder="Correo electronico"
              className="inputP oculto"
              name="correo"
              id="correo"
              defaultValue={user.email}
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

            {errors.telefono && (
              <p className="error-form-pedido">{errors.telefono}</p>
            )}
            <input
              type="text"
              placeholder="Dirección de residencia"
              className="inputP"
              name="direccion"
              id="direccion"
              required
            />

            {errors.direccion && (
              <p className="error-form-pedido">{errors.direccion}</p>
            )}
            <textarea
              name="descripcion"
              id="descripcion"
              placeholder="Descripción de residencia, Ejemplo: casa, apartamento ..."
              className="inputP"
              required
            ></textarea>
            {errors.descripcion && (
              <p className="error-form-pedido">{errors.descripcion}</p>
            )}
            <textarea
              name="pedido"
              id="pedido"
              className="inputP oculto"
              defaultValue={JSON.stringify(listProduct, null, 2)}
              required
            ></textarea>
            <input
              type="submit"
              className="btn-submit-buy"
              value={"Realizar pedido"}
              onClick={handleButtonClick}
            />
          </form>
        </div>
        <div className="verify-pedido">
          <h5 className="subtitle-pedido">Pedido</h5>
          <div className="producto-buy">
            {listProduct.map((item, index) => (
              <div className="card-shop" key={index}>
                <img src={`./src/img/${item.img}`} />
                <div className="item-data-shop">
                  <p className="item-name-shop">{item.name.toUpperCase()}</p>
                  <p className="item-units-shop">
                    X{item.units * item.amount} units
                  </p>
                  <p className="item-price-shop">
                    $ {formatNumber(item.price * item.amount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="total-buy">
            <p>Total: ${formatNumber(subTotal)} COP</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormPedido;
