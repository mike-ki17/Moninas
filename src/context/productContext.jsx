import { createContext, useContext, useState, useEffect } from "react";
import { products } from "../components/Card/CardList";
export const productContext = createContext();

export function ProductProvider({ children }) {
  const [listProduct, setListProduct] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [amount, setAmount] = useState(1);
  const [OriginProducts, setOriginProducts] = useState(products)
  const handleAmountItem = (price, m, i,index) => {
    const updateAmount = [...listProduct];
    updateAmount[m].amount += i;
    i === 1 ? setSubTotal(subTotal + price) : setSubTotal(subTotal - price);
    OriginProducts.map((product) => {
      if(product.id == listProduct[index].id){
        product.amount = listProduct[index].amount    
      }
    })

    setListProduct(updateAmount);
  };

  const showCounter = (m) => {
    console.log(m)
    return <p>:V</p>
  }

  const handleProduct = (name, price, img, id) => {
    const newProduct = {
      id: id,
      name: name,
      price: price,
      img: img,
      amount: amount,
      // show: true,
      // counter: false
    };
    setListProduct([...listProduct, newProduct]);
    setSubTotal(subTotal + price);
    // findIndexList(id, newProduct)
    return listProduct, subTotal;
  };

  const deleteProduct = (subtotal, price, amount, i) => {
    OriginProducts.map((m, index) => {m.id == listProduct[i].id && handleShowProduct(index)})
    const SubtotalRelativo = price * amount;
    setSubTotal(subtotal - SubtotalRelativo);
    setListProduct((listProduct) =>
      listProduct.filter((_, index) => index !== i)
    );

  };

  const handleShowProduct = (i) => {
    const updateOriginProducts = [...OriginProducts]
    updateOriginProducts[i].show ? updateOriginProducts[i].show = false : updateOriginProducts[i].show = true;
    updateOriginProducts[i].amount == 0 && (updateOriginProducts[i].amount = 1);
    setOriginProducts(updateOriginProducts)
  }

  const verifyAmountProduct = (subtotal, price, amount, i) => {
    if (amount <= 1) {
      deleteProduct(subtotal, price, 1, i);
    }
  };

  useEffect(() => {}, [listProduct]);

  return (
    <productContext.Provider
      value={{
        OriginProducts,
        setOriginProducts,
        listProduct,
        handleProduct,
        setListProduct,
        subTotal,
        setSubTotal,
        amount,
        setAmount,
        handleAmountItem,
        deleteProduct,
        verifyAmountProduct,
        showCounter
      }}
    >
      {children}
    </productContext.Provider>
  );
}

export const useProductContext = () => {
  return useContext(productContext);
};
