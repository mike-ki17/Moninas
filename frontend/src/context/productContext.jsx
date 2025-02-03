import { createContext, useContext, useState, useEffect } from "react";
import { products } from "../DB/CardList";
export const productContext = createContext();

export function ProductProvider({ children }) {

  const [listProduct, setListProduct] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [amount, setAmount] = useState(1);
  const [OriginProducts, setOriginProducts] = useState(products);

  // Funcion para el aumento o el decremento de los productos 
  const handleAmountItem = (price, m, i, index) => {
    const updateAmount = [...listProduct];
    updateAmount[m].amount += i;
    i === 1 ? setSubTotal(subTotal + price) : setSubTotal(subTotal - price);

    OriginProducts.map((product) => {
      if (product.id == listProduct[index].id) {
        product.amount = listProduct[index].amount;
      }
    });

    setListProduct(updateAmount);
  };

  // Añadir pruductos al carrito de compras
  const handleProduct = (name, price, img, id, amount, units) => {
    const newProduct = {
      id: id,
      name: name,
      price: price,
      img: img,
      amount: amount,
      units: units
    };
    setListProduct([...listProduct, newProduct]);
    return listProduct, subTotal;
  };

  // Eliminar productos del carrito de compras
  const deleteProduct = (i) => {
    OriginProducts.map((m, index) => {
      m.id == listProduct[i].id && handleShowProduct(index);
    });
    setListProduct((listProduct) =>
      listProduct.filter((_, index) => index !== i)
    );
  };

  // Si el producto esta agregado o no al carrito de compras se verifica el show para controlar la vista del boton de agregar o el counterproduct
  const handleShowProduct = (i) => {
    const updateOriginProducts = [...OriginProducts];
    updateOriginProducts[i].show
      ? (updateOriginProducts[i].show = false)
      : (updateOriginProducts[i].show = true);
    updateOriginProducts[i].amount == 0 && (updateOriginProducts[i].amount = 1);
    setOriginProducts(updateOriginProducts);
  };

  // Se verifica si el amount para eliminar el prdducto automaticamente
  const verifyAmountProduct = (amount, i) => {
    if (amount <= 1) {
      deleteProduct(i);
    }
  };

  // Cada que se actualiza listProduct se calcula el subtotal
  useEffect(() => {
    const newSubTotal = listProduct.reduce(
      (sum, product) => sum + product.price * product.amount,
      0
    );

    if (newSubTotal !== subTotal) {
      setSubTotal(newSubTotal); // Actualiza el subtotal
    }
  }, [listProduct]);

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
      }}
    >
      {children}
    </productContext.Provider>
  );
}

export const useProductContext = () => useContext(productContext);
