import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import backgroundImage from "./background.jpg";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { AuthContext } from "../../AuthContext";
import axios from "axios";

function Login() {
  const [registro, setRegistro] = useState(true); //Manejadores de estado para registrar o logear
  const [ErrMessage, setErrMessage] = useState(null); //Manejador de estado para el mensaje de error
  const navigate = useNavigate();

  const auth = getAuth();
  const { setIsAuthenticated } = useContext(AuthContext);
  const { setUser } = useContext(AuthContext);
  const { setUserData } = useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);

  //Constructor para usuario default
  const Usuario = {
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    direccion: "Sin asignar",
    contacto: "Sin asignar",
    foto: "",
    calificacion: "Sin calificación",
    reportes: 0,
    estatus: 1,
  };
  const [usuario, setUsuario] = useState(Usuario);

  //Función para capturar los datos de los input
  const capturarData = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  //Función para guardar los datos del usuario en mongo
  const guardarData = async (e) => {
    e.preventDefault();
    //Obtener datos ingresados por el usuario
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
    //Validar que el teléfono sea un número
    const esNumero = /^\d+$/.test(usuario.telefono);
    if (esNumero && usuario.telefono.length == 10) {
      if (strength >= 4) {
        try {
          //Enviar una solicitud POST para guardar los datos en la base de datos
          await axios.post("http://localhost:4000/api/usuarios", newUser)
          setUsuario({ ...Usuario }); //Actualizar el estado del usuario
          alert("Usuario registrado con éxito");
          Registrar();
        } catch (error) {
          console.log(error);
          alert("Error al registrar usuario");
        }
      } else {
        window.alert("La contraseña no es segura");
      }
    } else {
      alert("Por favor ingrese un número de teléfono válido de 10 dígitos");

    }
  };

  //Crear un usuario
  function Registrar() {
    const email = document.getElementById("usuario-email").value;
    const password = document.getElementById("usuario-password").value;
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        //Alerta de registro exitoso
        window.alert(user.email + " registrado con exito");
        //Limpiar los inputs
        document.getElementById("usuario-email").value = "";
        document.getElementById("usuario-password").value = "";
        setRegistro(!registro);
      })
      .catch((error) => {
        const errorMessage = error.message;
        errorMessage ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
          ? setErrMessage("La contraseña tiene que ser mayor a 6 caracteres")
          : errorMessage === "Firebase: Error (auth/email-already-in-use)."
            ? setErrMessage("Correo en uso")
            : setErrMessage("Datos mal ingresados");
      });
  }

  //Ingresar usuario
  function Ingresar() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        CargarDatos(userCredential.user);
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error("Error en Login", errorMessage);
        errorMessage === "Firebase: Error (auth/wrong-password)."
          ? setErrMessage("Contraseña incorrecta")
          : setErrMessage("Correo no registrado");
        console.log(ErrMessage);
      });
  }
  //Cargar datos del usuario a todos los componentes
  async function CargarDatos(user) {
    const campoBuscado = user.email; //Correo del usuario
    const res = await axios.get(
      `http://localhost:4000/api/usuarios/${campoBuscado}`
    );
    const InfoUsuario = res.data;
    setUserData(InfoUsuario);
    setUser(user);
    setIsAuthenticated(true);
    //guardar usuario en memoria local
    localStorage.setItem("email", JSON.stringify(InfoUsuario.email));
  }

  function checkPasswordStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;
    return score;
  }

  const strengthClass =
    strength < 2 ? "weak" : strength < 4 ? "medium" : "strong";

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    checkPasswordStrength(e.target.value);
    const strength = checkPasswordStrength(password);
    setStrength(strength);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        padding: "2rem",
      }}
    >
      <Container className="min-vh-100">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <div
              style={{ backgroundColor: "white", padding: "2rem" }}
              className="mt-3"
            >
              <div className="d-flex">
                <h1 className="text-black ms-3">Xchange Life</h1>
                <a
                  href="#"
                  className="m-auto me-5 text-secondary"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Regresar
                </a>
              </div>
              <br />
              {registro ? (
                <>
                  <h2 className="text-black my-3">Login</h2>
                  <Form.Group>
                    <h5 className="text-secondary mt-4">Correo</h5>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      id="email"
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <h5 className="text-secondary mt-4">Contraseña</h5>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      id="password"
                      required
                    />
                  </Form.Group>

                  <p className="text-danger mt-2" id="error-message">
                    {ErrMessage}
                  </p>

                  <div className="d-flex align-items-cneter justify-content-center">
                    <Button
                      variant="primary"
                      className="mt-5 py-2 w-50"
                      onClick={Ingresar}
                    >
                      Ingresar
                    </Button>
                  </div>

                  <p className="text-secondary mt-3 d-flex justify-content-center align-items-center">
                    No tienes cuenta? &nbsp;
                    <a
                      href="#"
                      onClick={() => {
                        setRegistro(!registro);
                        setErrMessage(null);
                      }}
                    >
                      {" "}
                      Registrate
                    </a>
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-black my-3">Sign in</h2>

                  <form onSubmit={guardarData}>
                    <Form.Group>
                      <h5 className="text-secondary mt-4">Nombre*</h5>
                      <Form.Control
                        id="usuario-nombre"
                        name="nombre"
                        type="text"
                        placeholder="Enter name"
                        required
                        onChange={capturarData}
                      />
                    </Form.Group>

                    <Form.Group>
                      <h5 className="text-secondary mt-4">Apellido*</h5>
                      <Form.Control
                        id="usuario-apellido"
                        name="apellido"
                        type="text"
                        placeholder="Enter name"
                        required
                        onChange={capturarData}
                      />
                    </Form.Group>

                    <Form.Group>
                      <h5 className="text-secondary mt-4">Teléfono</h5>
                      <Form.Control
                        id="usuario-telefono"
                        name="telefono"
                        type="text"
                        placeholder="Enter phone"
                        onChange={capturarData}
                        maxLength="10"
                      />
                    </Form.Group>

                    <Form.Group>
                      <h5 className="text-secondary mt-4">Correo*</h5>
                      <Form.Control
                        id="usuario-email"
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        required
                        onChange={capturarData}
                      />
                    </Form.Group>

                    <Form.Group>
                      <h5 className="text-secondary mt-4">Contraseña*</h5>
                      <p className="text-secondary">
                        Debe ser mayor a 6 caracteres, incluir caracteres
                        especiales, números y mayúsculas.
                      </p>
                      <Form.Control
                        id="usuario-password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        className={`password-input ${strengthClass}`}
                        required
                      />
                    </Form.Group>

                    <p className="text-danger mt-3" id="error-message">
                      {ErrMessage}
                    </p>

                    <div className="d-flex align-items-cneter justify-content-center">
                      <Button
                        variant="primary"
                        className="mt-5 py-2 w-50"
                        type="submit"
                        onClick={() => {
                          //Registrar();
                          setErrMessage(null);
                        }}
                      >
                        Registrar
                      </Button>
                    </div>
                  </form>

                  <p className="text-secondary mt-3 d-flex justify-content-center align-items-center">
                    Ya tienes cuenta?&nbsp;
                    <a
                      href="#"
                      onClick={() => {
                        setRegistro(!registro);
                        setErrMessage(null);
                      }}
                    >
                      {" "}
                      Ingresa
                    </a>
                  </p>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
