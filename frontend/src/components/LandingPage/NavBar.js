import React, { useState, useEffect, useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../assets/img/SVG/Logo.svg";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { getAuth, signOut } from "firebase/auth";
import axios from "axios";

export const NavBar = (props) => {
  const [scrolled, setScrolled] = useState(false); //Saber si se escroleó la página para cambiar el estilo del navbar
  const { isAuthenticated } = useContext(AuthContext); //Saber de forma global si hay un usuario autenticado
  const { setIsAuthenticated } = useContext(AuthContext); //Establecer si un usuario está autenticado
  const { setUserData } = useContext(AuthContext);
  const { UserData } = useContext(AuthContext);
  const { setUser } = useContext(AuthContext); //Establecer el objeto usuario
  const auth = getAuth();

  //Proceso de cierre de seción con Google
  const logOut = () => {
    signOut(auth);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.clear();
  };

  //Saber si se hizo scroll a la pagina para cambiar el estilo del nav
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  //Extraer datos del usuario de la memoria local
  async function extraerDatos() {
    if (localStorage.getItem("email") != null) {
      const correoEnMemoria = localStorage
        .getItem("email")
        .replace(/['"]+/g, "");
      const res = await axios.get(
        `http://localhost:4000/api/usuarios/${correoEnMemoria}`
      );
      setUserData(res.data);
      setIsAuthenticated(true);
    }
  }

  return (
    <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
      <Container className="container">
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo" className="LogoIcon" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/" className="active navbar-link">
              Inicio
            </Link>
            <Link to="/productos" className="active navbar-link">
              Productos
            </Link>
            {!isAuthenticated ? (
              <Link to="/login" className="active navbar-link" onClick={extraerDatos()}>
                Login
              </Link>
            ) : (
              <>
                <Link to="/profile" className="active navbar-link">
                  Perfil
                </Link>
                <Link onClick={logOut} to="/" className="active navbar-link">
                  Sign Out
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
