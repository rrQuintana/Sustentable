import React, { useState, useContext, useEffect } from "react";
import { NavBar } from "../LandingPage/NavBar";
import { AuthContext } from "../../AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { UserData } = useContext(AuthContext);
  const { isAuthenticated } = useContext(AuthContext);

  const [productData, setproductD] = useState({
    titulo: "",
    contenido: "",
    categoria: "",
    precio: "",
    reportes: 0,
    autor: UserData._id,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/publicaciones/${id}`)
      .then((response) => {
        setproductD(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setproductD({ ...productData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(`http://localhost:4000/api/publicaciones/${id}`, productData)
      .then((response) => {
        console.log(response.data);
        navigate("/profile");
        window.alert("Publicación editada");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <NavBar></NavBar> <br /> <br /> <br /> <br />
          <h1>Editar productos</h1>
          <div className="w-50">
            <form onSubmit={handleSubmit}>
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  Título*
                </span>
                <input
                  id="publicacion-titulo"
                  name="titulo"
                  type="text"
                  className="form-control"
                  // placeholder="algo + {publi.titulo}"
                  value={productData.titulo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <br />

              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  Descipción*
                </span>
                <input
                  id="publicacion-contenido"
                  name="contenido"
                  type="text"
                  className="form-control"
                  value={productData.contenido}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <br />

              <div className="input-group mb-3">
                <label className="input-group-text">Categoría*</label>
                <select
                  id="publicacion-categoria"
                  name="categoria"
                  onChange={handleInputChange}
                  value={productData.categoria}
                  required
                >
                  <option value="">Seleccione una categoría</option>
                  <option value="ropa">Ropa y accesorios</option>
                  <option value="electrónica">Electrónica</option>
                  <option value="hogar">Hogar y jardín</option>
                  <option value="deportes">
                    Deportes y actividades al aire libre
                  </option>
                  <option value="belleza">Belleza y cuidado personal</option>
                  <option value="juguetes">Juguetes y juegos</option>
                  <option value="alimentos">Alimentos y bebidas</option>
                  <option value="animales">Animales y mascotas</option>
                </select>
              </div>

              <div className="input-group mb-3">
                <label
                  className="input-group-text"
                  name="precio"
                  onChange={handleInputChange}
                >
                  Precio*
                </label>
                <select
                  id="publicacion-precio"
                  name="precio"
                  onChange={handleInputChange}
                  value={productData.precio}
                  required
                >
                  <option value="">Yo quiero recibir..</option>
                  <option value="">Dinero (especificar en descripción)</option>
                  <option value="Ropa y accesorios">Ropa y accesorios</option>
                  <option value="Electrónica">Electrónica</option>
                  <option value="Hogar y jardín">Hogar y jardín</option>
                  <option value="Deportes">
                    Deportes y actividades al aire libre
                  </option>
                  <option value="Belleza">Belleza y cuidado personal</option>
                  <option value="Juguetes">Juguetes y juegos</option>
                  <option value="Alimentos">Alimentos y bebidas</option>
                  <option value="Animales">Animales y mascotas</option>
                </select>
              </div>

              <button className="btn btn-primary" type="submit">
                Guardar
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="w-100 vh-100 bg-white">
          <NavBar></NavBar> <br /> <br /> <br /> <br />
          <h1 className="text-dark mt-5 d-flex align-items-center justify-content-center">
            Debes iniciar sesión para acceder a esta página
          </h1>
          <h3
            onClick={() => navigate("/login")}
            className="text-dark mt-5 d-flex align-items-center justify-content-center"
          >
            <a href="#">Ir a login</a>
          </h3>
        </div>
      )}
    </>
  );
}

export default ProductEdit;
