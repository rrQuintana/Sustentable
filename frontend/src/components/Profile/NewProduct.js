import React, { useState, useContext, useEffect } from "react";
import { NavBar } from "../LandingPage/NavBar";
import { db } from "../firebase.config";
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import { AuthContext } from "../../AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function NewProduct() {

  const navigate = useNavigate(); //Navegar entre links
  const { UserData } = useContext(AuthContext); //datos del usuario
  const { isAuthenticated } = useContext(AuthContext);
  const storage = getStorage(); //storage de firebase
  const [imageUrl, setImageUrl] = useState(""); //url de imagen de firebase

  //capturar datos para nueva publicación
  const capturarData = (e) => {
    const { name, value } = e.target;
    setPublicacion({ ...publicacion, [name]: value });
  };

  //Guardar la imagen en firebase y obtener su link
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const imagesRef = ref(
      storage,
      "productos/" +
        publicacion.autor +
        "/" +
        publicacion.titulo +
        "-" +
        file.name
    );
    await uploadBytes(imagesRef, file);
    const url = await getDownloadURL(imagesRef);
    setImageUrl(url);
  };

  //Manejadores de estado para publicaciones
  const Publicacion = {
    titulo: "",
    contenido: "",
    foto: imageUrl,
    categoria: "",
    precio: "",
    reportes: 0,
    autor: UserData._id,
  };
  const [publicacion, setPublicacion] = useState(Publicacion);

  //Guardar publicación
  const guardarData = async (e) => {
    e.preventDefault();
    try {
      //Crear función post
      const newPublicacion = {
        titulo: publicacion.titulo,
        contenido: publicacion.contenido,
        foto: imageUrl,
        categoria: publicacion.categoria,
        precio: publicacion.precio,
        reportes: publicacion.reportes,
        autor: publicacion.autor,
      };
      console.log(newPublicacion);

      await axios.post(
        "http://localhost:4000/api/publicaciones",
        newPublicacion
      );

      setPublicacion({ ...Publicacion });
      window.alert("Publicación guardada ", publicacion.titulo);
      navigate("/profile");
    } catch (e) {
      window.alert("Error al guardar publicación");
    }
  };

  ///!!!!!!!!!!!!! NO BORRAR !!!!!!!!!!!!!!!!!!!!!!!!!!!!
  async function Guardar() {
    try {
      const docRef = await addDoc(collection(db, "productos"), {
        Nombre: document.getElementById("new-product-name").value,
        Descripcion: document.getElementById("new-product-description").value,
        Peticion: document.getElementById("new-product-request").value,
        Reportes: 0,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  ///!!!!!!!!!!!!! SI ESTA FUNCIÓN SE BORRA SE CAE EL BACKEND

  return (
    <div>
      {isAuthenticated ? (
        <>
          <NavBar></NavBar> <br /> <br /> <br /> <br />
          <h1>Agregar productos</h1>
          <div className="w-50">
            <form onSubmit={guardarData}>
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  Título*
                </span>
                <input
                  id="publicacion-titulo"
                  name="titulo"
                  type="text"
                  className="form-control"
                  placeholder="Título"
                  onChange={capturarData}
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
                  placeholder="Descripción"
                  onChange={capturarData}
                  required
                />
              </div>
              <br />

              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  Fotografía*
                </span>
                {imageUrl && <img src={imageUrl} alt="Uploaded image" style={{width: 300}}/>}
                <input
                  id="publicacion-foto"
                  name="foto"
                  type="file"
                  onChange={handleFileChange}
                  required
                />                
              </div>
              <br />

              <div className="input-group mb-3">
                <label className="input-group-text">Categoría*</label>
                <select
                  id="publicacion-categoria"
                  name="categoria"
                  onChange={capturarData}
                  required
                >
                  <option value="Libros">Libros</option>
                  <option value="Papelería">Papelería</option>
                  <option value="Equipo escolar">Equipo escolar</option>
                  <option value="Suministros escolares">Suministros escolares</option>
                  <option value="Tecnología">Tecnología</option>
                  <option value="Instrumentos musicales">Instrumentos musicales</option>
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
              </div>

              <div className="input-group mb-3">
                <label
                  className="input-group-text"
                  name="precio"
                  onChange={capturarData}
                >
                  Precio*
                </label>
                <select
                  id="publicacion-precio"
                  name="precio"
                  onChange={capturarData}
                  required
                >
                  <option value="Libros">Libros</option>
                  <option value="Papelería">Papelería</option>
                  <option value="Equipo escolar">Equipo escolar</option>
                  <option value="Suministros escolares">Suministros escolares</option>
                  <option value="Tecnología">Tecnología</option>
                  <option value="Instrumentos musicales">Instrumentos musicales</option>
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
    </div>
  );
}

export default NewProduct;
