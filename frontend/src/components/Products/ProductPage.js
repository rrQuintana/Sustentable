import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "../LandingPage/NavBar";
import "./ProductP.css";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import Button from '@mui/material/Button';

function ProductPage() {
  const { UserData } = useContext(AuthContext);
  const { isAuthenticated } = useContext(AuthContext); //Saber si el usuario está autenticado

  let { id } = useParams();
  // let { idPersona } = useParams();
  const [publicacion, setPublicacion] = useState([]);
  const [autor, setAutor] = useState([]);
  const [lista, setLista] = useState([]);

  function agregarReporte() {
    axios.post("http://localhost:4000/api/publicaciones/reportes/" + id)
      .then(response => {
        console.log(response);
        
      })
      .catch(error => {
        console.log(error);
      });
    window.alert("Reporte a publicacion exitoso!!");
  }

  const reportComent = async (userId, commentId) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/usuarios/${userId}/reportes/${commentId}`);
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
    window.alert("Reporte a comentario exitoso!!");
  };

  useEffect(() => {
    //Extraer la informacipon del producto y del autor
    const extraerDatos = async () => {
      if (id) {
        //Información del producto
        const res = await axios.get(
          "http://localhost:4000/api/publicaciones/" + id
        );
        setPublicacion(res.data);
        console.log(res.data);
        //Información del autor
        const result = await axios.get(
          "http://localhost:4000/api/usuarios/get/" + res.data.autor
        );
        setAutor(result.data);

        //Comentarios
        const resComents = await axios.get(
          "http://localhost:4000/api/publicaciones/comentarios/" + id
        );
        setLista(resComents.data);
      }
    };
    extraerDatos();
  }, []);

  //Manejadores de estado para comentarios
  const Comentario = {
    contenido: "",
    publicacion: { id },
    autor: UserData._id,
  };
  const [comentario, setComentario] = useState(Comentario);

  const capturarData = (e) => {
    const { name, value } = e.target;
    setComentario({ ...comentario, [name]: value });
  };

  const guardarData = async (e) => {
    try {
      if (isAuthenticated) {
        //Crear función post
        const newComentario = {
          contenido: comentario.contenido,
          publicacion: id,
          autor: UserData._id,
        };
        console.log(newComentario);

        await axios.post(
          "http://localhost:4000/api/comentarios",
          newComentario
        );

        setComentario({ ...Comentario });
        window.alert("Comentario publicado");
      } else {
        window.alert("Debe iniciar sesión para comentar");
      }
    } catch (e) {
      window.alert("Error al guardar el comentario");
    }
  };

  return (
    <div className="all">
      <NavBar></NavBar> <br /> <br /> <br />
      <br /> <br />
      <section
        className="section about-section gray-bg vh-100 vh-100 d-flex justify-content-center align-items-center"
        id="about"
      >
        <div className="container">
          <div className="row align-items-center flex-row-reverse mt-5">
            <div className="col-lg-6">
              <div className="about-text go-to">
                <h3 className="dark-color">{publicacion.titulo}</h3>
                <p className="text-black lead">
                  Listado por: {autor.nombre + autor.apellido}{" "}
                </p>
                <h6 className="text-black lead mt-5">
                  Estoy buscando atículos de:
                </h6>
                <div className="d-flex justify-content-start">
                  <p className="pr-category cDCFFC7">{publicacion.precio}</p>
                </div>
                <h6 className="text-black mt-5">
                  Descripcion del producto:{" "}
                </h6>
                <div className="pr-descr">
                  <p className="pp">{publicacion.contenido}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="d-flex justify-content-start">
                <h5 className="pr-category mb-5 c5DD315">
                  Categoría: {publicacion.categoria}
                </h5>
              </div>
              <div className="about-avatar ms-5">
                <img
                  src={publicacion.foto}
                  title=""
                  alt=""
                  style={{ width: 400, height: 400 }}
                />
              </div>
            </div>
            <Button id="agregarReporte()" onClick={agregarReporte} variant="outlined" color="error" className="butP">Reportar Publicacion</Button>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2 className="text-black fw-bold my-4">Comentarios</h2>
              {lista.map((product) => (
                <div className="comment-form mt-3" key={product._id}>
                  <form>
                    <div className="row">
                      <div className="d-flex mb-1">
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar7.png"
                          alt="autor-icon"
                          style={{ width: 20, height: 20 }}
                        />
                        <h5 className="text-secondary ms-2">{product.autor}</h5>
                      </div>

                      <p className="text-black">{product.contenido}</p>
                      <Button onClick={() => reportComent(product.autor, product._id)} variant="outlined" color="error" className="butE">Reportar</Button>
                      <hr className="text-black w-50 ms-2" />
                    </div>
                  </form>
                </div>
              ))}
            </div>

            <div className="col-lg-6">
              <h3 className="text-black fw-bold my-4">Dejar un comentario</h3>
              <form onSubmit={guardarData}>
                <textarea
                  name="contenido"
                  id="comentario"
                  cols="65"
                  rows="5"
                  onChange={capturarData}
                  required
                ></textarea>
                <button className="btn btn-primary" type="submit">
                  Publicar
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductPage;
