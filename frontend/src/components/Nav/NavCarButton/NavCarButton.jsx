import { useCarContext, useProductContext } from "../../../context";
import { BiCartAlt } from "react-icons/bi";

import "./NavCarButton.css";

function NavCarButton() {
  const { listProduct } = useProductContext();
  const { handleCar } = useCarContext();

  return (
    <button className="container-btn-car" onClick={handleCar}>
      <BiCartAlt className="btn-car" />
      <span
        className={listProduct.length == 0 ? "not-counter-car" : "counter-car"}
      >
        {listProduct.length}
      </span>
    </button>
  );
}

export default NavCarButton;
