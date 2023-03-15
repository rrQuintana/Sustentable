import React from "react";
import { Col } from "react-bootstrap";

function Services() {
  return (
    <div
      data-aos="fade-in"
      className="container d-flex row serrvices justify-content-center align-items-center"
    >
      <h1>Servicios</h1>
      <div className="d-flex m-3 flex-wrap justify-content-center align-items-center">
        <div className="service-bx">
          <p>
            <i className="fa-solid fa-user"></i>
          </p>
          <h4>Cuentas de Usuario</h4>
          <p className="service-bx-p">
            Crea una cuenta personalizada donde guardes tus publicaciones,
            intercambios.
          </p>
        </div>
        <div className="service-bx">
          <p>
            <i className="fa-solid fa-handshake"></i>
          </p>
          <h4>Intercambia o vende</h4>
          <p className="service-bx-p">
            Puedes escojer el tipo de productos que quieres recibir en el
            intercambio o simplemente puedes venderlos.
          </p>
        </div>
        <div className="service-bx">
          <p>
            <i className="fa-solid fa-star"></i>
          </p>
          <h4>Califica</h4>
          <p className="service-bx-p">
            ¿Realizaste un intercambio y quieres dejar una opinión? En
            NOMBRE$DE$LA$PAGINA puedes.
          </p>
        </div>
        <div className="service-bx">
          <p>
            <i className="fa-solid fa-ban"></i>
          </p>
          <h4>Reporta</h4>
          <p className="service-bx-p">
            Ya que somos una comunidad podemos decidir que queremos ver y que
            no, si ves algo inadecuado puedes reportarlo.
          </p>
        </div>
        <div className="service-bx">
          <p>
            <i className="fa-solid fa-eye"></i>
          </p>
          <h4>Navega</h4>
          <p className="service-bx-p">
            En NOMBRE$DE$LA$PAGINA puedes ver todos los artículos disponibles
            dentro de la pantalla principal de intercambios.
          </p>
        </div>
        <div className="service-bx">
          <p>
            <i className="fa-solid fa-magnifying-glass"></i>
          </p>
          <h4>Busca</h4>
          <p className="service-bx-p">
            ¿Buscas algo en específico? Usa la barra de navegación para buscar
            ese artículo que necesitas.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Services;
