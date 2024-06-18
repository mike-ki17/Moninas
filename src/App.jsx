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
import PanelAdmin from "./views/PanelAdmin.jsx";
import Pedido from "./views/Pedido.jsx";

// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   const rol = doc.data().rol.includes('admin')
// });

function App() {
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
                path="/admin"
                element={
                  <ProtecterRouter>
                    <PanelAdmin />
                  </ProtecterRouter>
                }
              />
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
