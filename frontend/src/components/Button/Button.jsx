import CounterProducts from "../CounterProducts/CounterProducts";
import { useProductContext } from "../../context/productContext";
// Icono
import { BiCartAlt } from "react-icons/bi";

import "./Button.css";

function Button({ elem, id, style }) {
  const {
    OriginProducts,
    listProduct,
    subTotal,
    handleProduct,
    setOriginProducts,
  } = useProductContext();

  
  const showStatusProduct = (i, id) => {
    const updateOriginProducts = [...OriginProducts];
    updateOriginProducts[i].show
      ? (updateOriginProducts[i].show = false)
      : (updateOriginProducts[i].show = true);
    setOriginProducts(updateOriginProducts);
  };

  return (  
    <>
      {elem.show ? (
        listProduct.map(
          (a, i) =>
            a.id == elem.id && (
              <div className={style} key={a.id}>
                <CounterProducts
                  price={elem.price}
                  amount={elem.amount}
                  index={i}
                  subTotal={subTotal}
                  modificWidth={true}
                />
              </div>
            )
        )
      ) : (
        <div className="container-btn">
          <button
            className="btn"
            onClick={() => {
              handleProduct(
                elem.name,
                elem.price,
                elem.img,
                elem.id,
                elem.amount,
                elem.units,
              );
              showStatusProduct(id, elem.id);
            }}
          >
            Agregar <BiCartAlt className="icon" />
          </button>
        </div>
      )}
    </>
  );
}

export default Button;
