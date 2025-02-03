import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import { CarProvider } from "./context/showCar.jsx";
import { ProductProvider } from "./context/productContext.jsx";
import { ProtecterRouter } from "./app/ProtecterRouter.jsx";

import Inicio from "./views/Inicio";
import Login from "./views/Login";
import Register from "./views/Register.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Product from "./views/Product.jsx";
import Contacto from "./views/Contacto.jsx";
// import PanelAdmin from "./views/PanelAdmin.jsx";
import Pedido from "./views/Pedido.jsx";
// import useFullHeight from "./hooks/useFullHeight.jsx";

function App() {
  // useFullHeight();
  return (
    <AuthProvider>
      <ProductProvider>
        <CarProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/product/:id"
                element={
                  <ProtecterRouter>
                    <Product />
                  </ProtecterRouter>
                }
              />
              <Route
                path="/dash"
                element={
                  <ProtecterRouter>
                    <Dashboard />
                  </ProtecterRouter>
                }
              />
              <Route
                path="/contacto"
                element={
                  <ProtecterRouter>
                    <Contacto />
                  </ProtecterRouter>
                }
              />
              <Route
                path="/pedido"
                element={
                  <ProtecterRouter>
                    <Pedido />
                  </ProtecterRouter>
                }
              />
            </Routes>
          </BrowserRouter>
        </CarProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
