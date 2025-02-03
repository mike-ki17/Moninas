import "./CounterProducts.css";
import { useProductContext } from "../../context/productContext.jsx";
import { BiPlus } from "react-icons/bi";
import { BiMinus } from "react-icons/bi";
import { products } from "../../DB/CardList.jsx";
function CounterProducts({ price, amount, index, subTotal, modificWidth = false}) {
  const {
    handleAmountItem,
    verifyAmountProduct,
    setAmount,
    listProduct
  } = useProductContext();

  const handleAmount = (e) => {
    e.target.value = 0;
    setAmount(e.target.value);
  };

  return (
    <>
      <div className={!modificWidth ? "count-container-item" : "count-container-item-mod"}>
        <BiMinus
          className="btn-count"
          onClick={() => {
            handleAmountItem(price, index, -1, index);
            verifyAmountProduct(amount, index);
          }}
        />
        <input
          type="number"
          className="count-items"
          value={amount}
          onChange={handleAmount}
        />
        <BiPlus
          className="btn-count"
          onClick={() => {
            handleAmountItem(price, index, 1, index);
          }}
        />
      </div>
    </>
  );
}

export default CounterProducts;
