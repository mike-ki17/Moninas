import { useAuth } from "../context/authContext.jsx";
import { useProductContext } from "../context/productContext.jsx";

// Componentes extras
import FormPedido from "../components/FormPedido/FormPedido.jsx";
import Loader from "../components/Loader/Loader.jsx";
import Nav from "../components/Nav/Nav.jsx";

import '../css/Pedido.css'


import React from 'react'

function Pedido() {

  const { user, logout, loading, haldleLogout } = useAuth();
  if (loading) return <Loader />;

  const { listProduct } = useProductContext();

  return (
    <>
     <Nav
        photo={user.photoURL}
        logOut={haldleLogout}
        name={user.displayName || user.email}
        display={false}
      />

      <h2 className="sub-title-buy">Realiza tu pedido</h2>

      <FormPedido />
    

    </>
  
  )
}

export default Pedido



