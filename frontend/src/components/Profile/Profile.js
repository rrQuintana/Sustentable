import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Image, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../LandingPage/NavBar";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";
import DefaultUserIcon from "./default-user.png";
import "./Profile.css";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


function Profile() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext); //Saber si el usuario está autenticado
  const { UserData } = useContext(AuthContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openUpdateStatus, setOpenUpdateStatus] = React.useState(false);
  const handleOpenUpdateStatus = () => setOpenUpdateStatus(true);
  const handleCloseUpdateStatus = () => setOpenUpdateStatus(false);
  const [imageUrl, setImageUrl] = useState(UserData.foto);

  const [openAddP, setOpenAddP] = React.useState(false);
  const handleOpenAddP = () => setOpenAddP(true);
  const handleCloseAddP = () => setOpenAddP(false);

  const [lista, setLista] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      //Obtener publiaciones del usuario
      const getPubliaciones = async () => {
        const res = await axios.get(
          `http://localhost:4000/api/publicaciones/buscar/${UserData._id}`
        );
        setLista(res.data);
      };
      getPubliaciones();
    }
  }, [lista]);

  const getPubliaciones = async () => {
    const res = await axios.get(
      `http://localhost:4000/api/publicaciones/buscar/${UserData._id}`
    );
    setLista(res.data);
  };

  const eliminarProducto = async (id) => {
    window.confirm("¿Está seguro de eliminar este producto?")
      ? await axios.delete(`http://localhost:4000/api/publicaciones/${id}`)
      : window.alert("No se eliminó el producto");
    getPubliaciones();
  };

  const Usuario = {
    nombre: UserData.nombre,
    apellido: UserData.apellido,
    telefono: UserData.telefono,
    email: UserData.email,
    direccion: UserData.direccion,
    contacto: UserData.contacto,
    foto: imageUrl,
    calificacion: UserData.calificacion,
    reportes: UserData.reportes,
    estatus: UserData.estatus,
  };
  const [usuario, setUsuario] = useState(Usuario);

  //Función para capturar los datos de los input
  const capturarData = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  //Funcion para guardar los datos del usuario en mongo
  const guardarData = async (e) => {
    if (isAuthenticated) {
      //Meter datos ingresados en
      const newUser = {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        telefono: usuario.telefono,
        email: usuario.email,
        direccion: usuario.direccion,
        contacto: usuario.contacto,
        foto: usuario.foto,
        calificacion: usuario.calificacion,
        reportes: usuario.reportes,
        estatus: usuario.estatus,
      };
      try {
        //Crear función post de los datos
        await axios.put(
          "http://localhost:4000/api/usuarios/" + UserData._id,
          newUser
        );
        setUsuario({ ...Usuario });
        handleClose();
        window.alert("Datos actualizados");
        window.location.reload();
      } catch (error) {
        console.log(error);
        window.alert("Error al actualizar los datos");
      }
    } else {
      window.alert("Debes iniciar sesión para editar tu perfil");
    }
  };

  const [showEditIcon, setShowEditIcon] = useState(false);
  const storage = getStorage();
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const imagesRef = ref(
      storage,
      "usaurios/" +
      usuario.nombre +
        "/" +
        file.name
    );
    await uploadBytes(imagesRef, file);
    const url = await getDownloadURL(imagesRef);
    setImageUrl(url)
    setUsuario({ foto: imageUrl });
    guardarData();
  };
  return (
    <>
      <NavBar></NavBar>

      {isAuthenticated ? (
        <div className="bg-white d-flex row">
          <div className="container">
            <Row className="vh-100 h-custom d-flex justify-content-center align-items-center">
              <Col
                md={4}
                className="d-flex row justify-content-center align-items-center"
                onMouseEnter={() => setShowEditIcon(true)}
                onMouseLeave={() => setShowEditIcon(false)}
              >
                <Image
                  src={UserData.foto ? UserData.foto : DefaultUserIcon}
                  className="mb-2"
                  alt="profile pic"
                  style={{ width: "320px", height: "300px" }}
                  roundedCircle
                />
                {showEditIcon && (
                  <>
                    <div style={{
                          color: "black",
                          position: "absolute",
                          top: 290,
                          left: 340,
                          with: 10,
                        }}>
                      <input
                        type="file"
                        name=""
                        id=""
                        style={{
                          color: "black",
                          position: "absolute",
                          top: 10,
                          left: -90,
                          fontSize: 30,
                          opacity: 0,
                        }}
                        onChange={handleFileChange}
                      />

                      <i className="fa-solid fa-pencil" style={{fontSize: 80}}></i>
                    </div>
                  </>
                )}
                <button
                  className="btn btn-secondary mt-2 w-50"
                  onClick={handleOpen}
                >
                  Editar Perfil
                </button>
              </Col>
              <Col
                md={5}
                className="d-flex row justify-content-center align-items-center"
              >
                <div className="ms-5">
                  {UserData.estatus == 2 && (
                    <p className="text-black" style={{ marginBottom: 0 }}>
                      {UserData.calificacion}
                    </p>
                  )}

                  <h1 className="text-black" style={{ marginBottom: 0 }}>
                    {UserData.nombre + " " + UserData.apellido}
                  </h1>
                  <h4 className="mb-5 text-secondary">{UserData.email}</h4>
                  {UserData.estatus != 2 ? (
                    <>
                      <h4
                        className="text-black text-bold"
                        style={{ marginTop: -30, marginBottom: -10 }}
                      >
                        Información personal:
                      </h4>
                      <li>
                        <ul className="text-black">
                          {">"} Teléfono: {UserData.telefono}
                        </ul>
                      </li>
                      <h3 className="text-black text-bold">
                        ¿Quieres intercambiar tus artículos?
                      </h3>
                      <h3>
                        <a
                          className="text-info"
                          href="#"
                          onClick={handleOpenUpdateStatus}
                        >
                          Completa esta información
                        </a>
                      </h3>
                    </>
                  ) : (
                    <>
                      <h4
                        className="text-black text-bold"
                        style={{ marginTop: -30, marginBottom: -10 }}
                      >
                        Información personal:
                      </h4>
                      <li>
                        <ul className="text-black">
                          {">"} Teléfono: {UserData.telefono}
                        </ul>
                        <ul className="text-black">
                          {">"} Ubicación: {UserData.direccion}
                        </ul>
                        <ul className="text-black">
                          {">"} Contacto: {UserData.contacto}
                        </ul>
                      </li>
                      <button
                        className="btn btn-primary mt-2"
                        onClick={() => {
                          navigate("newProduct");
                        }}
                      >
                        Subir un producto
                      </button>
                    </>
                  )}
                  {/* Modal para editar perfil (la información que se edita depende del estatus del usurario)
                      Si el usuario tiene permisos normales solo puede editar su nombre y telefono
                      Si el usuario es vendedor puede editar otros datos */}
                  <Modal open={open} onClose={handleClose}>
                    <Box>
                      <div className="todo">
                        <div className="signupFrm">
                          {UserData.estatus != 2 ? (
                            <form action="" className="form" onSubmit={guardarData}>
                              <h2 className="text-secondary">Editar perfil</h2>
                              <div className="inputContainer">
                                <input
                                  type="text"
                                  className="input text-black"
                                  placeholder="a"
                                  name="nombre"
                                  onChange={capturarData}
                                />
                                <label for="" className="label">
                                  Nombre
                                </label>
                              </div>

                              <div className="inputContainer">
                                <input
                                  type="text"
                                  className="input"
                                  placeholder="a"
                                  name="apellido"
                                  onChange={capturarData}
                                />
                                <label for="" className="label">
                                  Apellido
                                </label>
                              </div>

                              <div className="inputContainer">
                                <input
                                  type="text"
                                  className="input"
                                  placeholder="a"
                                  name="foto"
                                  onChange={capturarData}
                                />
                                <label for="" className="label">
                                  Foto
                                </label>
                              </div>

                              <div className="inputContainer">
                                <input
                                  type="text"
                                  className="input"
                                  placeholder="a"
                                  name="telefono"
                                  onChange={capturarData}
                                />
                                <label for="" className="label">
                                  Telefono
                                </label>
                              </div>
                              <button
                                className="m-2 btn btn-primary"
                                onClick={guardarData}
                              >
                                Guardar
                              </button>
                              <button
                                className="m-2 btn btn-danger"
                                onClick={handleClose}
                              >
                                Cancelar
                              </button>
                            </form>
                          ) : (
                            <form action="" className="form" onSubmit={guardarData}>
                              <h2 className="text-secondary">Editar perfil</h2>
                              <div className="inputContainer">
                                <input
                                  type="text"
                                  className="input text-black"
                                  placeholder="a"
                                  name="nombre"
                                  onChange={capturarData}
                                />
                                <label for="" className="label">
                                  Nombre
                                </label>
                              </div>

                              <div className="inputContainer">
                                <input
                                  type="text"
                                  className="input"
                                  placeholder="a"
                                  name="apellido"
                                  onChange={capturarData}
                                />
                                <label for="" className="label">
                                  Apellido
                                </label>
                              </div>

                              <div className="inputContainer">
                                <input
                                  type="text"
                                  className="input"
                                  placeholder="a"
                                  name="foto"
                                  onChange={capturarData}
                                />
                                <label for="" className="label">
                                  Foto
                                </label>
                              </div>

                              <div className="inputContainer">
                                <input
                                  type="text"
                                  className="input"
                                  placeholder="a"
                                  name="telefono"
                                  onChange={capturarData}
                                />
                                <label for="" className="label">
                                  Telefono
                                </label>
                              </div>

                              <div className="inputContainer">
                                <input
                                  type="text"
                                  className="input"
                                  placeholder="a"
                                  name="direccion"
                                  onChange={capturarData}
                                />
                                <label for="" className="label">
                                  Direccion
                                </label>
                              </div>

                              <div className="inputContainer">
                                <input
                                  type="text"
                                  className="input"
                                  placeholder="a"
                                  name="contacto"
                                  onChange={capturarData}
                                />
                                <label for="" className="label">
                                  Contacto
                                </label>
                              </div>

                              {/* <input type="submit" className="submitBtn" value="Guardar" onClick={handleClose} /> */}
                              <button
                                className="m-2 btn btn-primary"
                                onClick={guardarData}
                              >
                                Guardar
                              </button>
                              <button
                                className="m-2 btn btn-danger"
                                onClick={handleClose}
                              >
                                Cancelar
                              </button>
                            </form>
                          )}
                        </div>
                      </div>
                    </Box>
                  </Modal>

                  {/* Modal para cambiar permisos de usuario normal a vendedor donde se pide información y se actualiza el perfil*/}
                  <Modal
                    open={openUpdateStatus}
                    onClose={handleCloseUpdateStatus}
                  >
                    <Box>
                      <div className="todo">
                        <div className="signupFrm">
                          <form
                            action=""
                            className="formUpdate"
                            onSubmit={guardarData}
                          >
                            <h2 className="text-secondary">
                              Perfil de vendedor
                            </h2>
                            <p className="text-black mb-4">
                              Para poder subir productos a la plataforma es
                              importante estar autenticado y tener algunos datos
                              de contacto.
                            </p>

                            <h5 className="text-black">
                              Institución educativa:
                            </h5>
                            <p className="text-black">
                              La direccion que se va a mostrar en tu perfil hace
                              referencia a la institución educativa a la que
                              perteneces así como el área en la que estudias,
                              especifícala a continuación:
                            </p>
                            <div className="inputContainer">
                              <input
                                type="text"
                                className="input"
                                placeholder="a"
                                name="direccion"
                                onChange={capturarData}
                                required
                              />
                              <label for="" className="label">
                                Direccion
                              </label>
                            </div>
                            <br />

                            <h5 className="text-black">Contacto:</h5>
                            <p className="text-black">
                              En este apartado especifica cómo te gustaría que
                              te contacten para realizar el intercambio, esta
                              información no será mostrada en tu perfil público.
                            </p>
                            <p className="text-secondary">
                              Ej. Whatsapp: 555 555 5555, Correo: email@mail.com
                            </p>
                            <div className="inputContainer">
                              <input
                                type="text"
                                className="input"
                                placeholder="a"
                                name="contacto"
                                onChange={capturarData}
                                required
                              />
                              <label for="" className="label">
                                Contacto
                              </label>
                            </div>
                            <button
                              className="m-2 btn btn-primary"
                              onClick={() => {
                                setUsuario({ estatus: 2 });
                                guardarData();
                              }}
                            >
                              Guardar
                            </button>
                            <button
                              className="m-2 btn btn-danger"
                              onClick={handleCloseUpdateStatus}
                            >
                              Cancelar
                            </button>
                          </form>
                        </div>
                      </div>
                    </Box>
                  </Modal>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                {UserData.estatus == 2 && (
                  <div>
                    <h1 className="m-5 text-black">Mis productos:</h1>
                    <div className="container-fluid d-flex m-3 flex-wrap justify-content-center align-items-center">
                      {lista.map((list) => (
                        <div
                          className="product-bx d-flex row flex-wrap justify-content-center align-items-center"
                          key={list._id}
                        >
                          <div className="product-img-container my-2 d-flex flex-wrap justify-content-center align-items-center">
                            <img src={list.foto} alt="imagen producto" />
                          </div>
                          <h4 className="product-bx-h d-flex flex-wrap justify-content-center align-items-center">
                            {list.titulo}
                          </h4>
                          <div className="product-bx-p-description">
                            {list.contenido}
                          </div>
                          <p className="product-bx-p mt-2 d-flex flex-wrap justify-content-center align-items-center">
                            Acepta artículos de:
                          </p>
                          <div className="product-items-box d-flex flex-wrap justify-content-center align-items-center">
                            <span>{list.precio}</span>
                          </div>
                          <p className="mt-2 product-bx-p-description d-flex flex-wrap justify-content-center align-items-center">
                            Categoría: {list.categoria}
                          </p>
                          <button
                            className="btn-danger"
                            onClick={() => eliminarProducto(list._id)}
                          >
                            Eliminar
                          </button>
                          <button
                            className="btn-primary"
                            onClick={() => {
                              navigate(`/ProductEdit/${list._id}`);
                            }}
                          >
                            Editar
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Col>
            </Row>
          </div>
        </div>
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

export default Profile;
