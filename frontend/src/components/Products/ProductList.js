import React, { useState, useEffect } from "react";
import ProductCart from "./ProductCart";
import axios from "axios";

function ProductList() {
  const [lista, setLista] = useState([]);
  const [buscando, setBuscando] = useState(false);
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    const getPubliaciones = async () => {
      if (!buscando) {
        const res = await axios.get("http://localhost:4000/api/publicaciones");
        setLista(res.data);
        console.log("-")
        setBuscando(true)
      }
    };
    getPubliaciones();
  }, [lista]);

  async function busqueda() {
    setBuscando(true)
    window.event.preventDefault();
    const sb = document.getElementById("categoria");
    const categoria = sb.value.replace(/['"]+/g, "");
    if (categoria === "Todo") {
      const res = await axios.get("http://localhost:4000/api/publicaciones");
        setLista(res.data);
    }else{
      setCategoria(categoria);
    lista.length = 0;
    const res = await axios.get(
      `http://localhost:4000/api/publicaciones/buscar/categoria/${categoria}`
    );
    setLista(res.data);
    }
    
  }

  return (
    <>
      <nav className="bg-dark d-flex align-items-center navBusqueda">
        <h5 className="mt-2 ms-5">Productos en Xchange</h5>
        <form className="d-flex ms-auto me-5" onSubmit={busqueda}>
          <select className="buscarCategoria mt-1" id="categoria">
            <option value="Todo">Todo</option>
            <option value="Libros">Libros</option>
            <option value="Papelería">Papelería</option>
            <option value="Equipo escolar">Equipo escolar</option>
            <option value="Suministros escolares">Suministros escolares</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Instrumentos musicales">
              Instrumentos musicales
            </option>
            <option value="Ropa">Ropa</option>
            <option value="Arte">Arte</option>
            <option value="Deportes">Deportes</option>
            <option value="Actividades físicas">Actividades físicas</option>
            <option value="Salud">Salud</option>
            <option value="Comida">Comida</option>
            <option value="Accesorios">Accesorios</option>
            <option value="Herramientas y equipo">Herramientas y equipo</option>
            <option value="Decoración y diseño">Decoración y diseño</option>
          </select>
          <button className="ms-3 mt-2 me-4 BusquedaIcon" type="submit">
            <i className="fa-solid fa-magnifying-glass text-white"></i>
          </button>
        </form>
      </nav>
      <div className="h-custom d-flex row products-list justify-content-center align-items-center">
        <h1>Productos</h1>
        <div className="container-fluid d-flex m-3 flex-wrap justify-content-center align-items-center">
          {lista.map((product, index) => {
            return <ProductCart key={index} {...product} />;
          })}
        </div>
      </div>
    </>
  );
}

export default ProductList;
