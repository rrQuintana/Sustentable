import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import LandingPage from "./components/LandingPage/LandingPage";
import Products from "./components/Products/Products";
import Profile from "./components/Profile/Profile";
import Error404 from "./components/Error404";
import "aos/dist/aos.css";
import Aos from "aos";
import NewProduct from "./components/Profile/NewProduct";
import Login from "./components/Login/Login";
import ProductPage from "./components/Products/ProductPage";
import Commennt from "./components/Products/Comennt";
import ProductEdit from "./components/Products/ProductEdit";

function App() {  

  useEffect(() => {
    //Animaciones para la página
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/inicio" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/ProductPage/:id" element={<ProductPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/newProduct" element={<NewProduct />} />
            <Route path="/ProductPage" element={<ProductPage />} />
            <Route path="/Comment" element={<Commennt />} />
            <Route path="/ProductEdit/:id" element={<ProductEdit />}/>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
