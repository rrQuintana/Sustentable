import { Col, Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

/*
  Espa página solo es para mostrar información de aboutme en la página principal
*/
export const AboutMe = () => {
  //Todas estas funciones son para dar algunas animaciones al texto
  
  // Define the text to be typed and the initial state of the text
  const text = "Hola, ¿Cómo estás?";
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    // Use an interval to update the typed text every 200 milliseconds
    const typingInterval = setInterval(() => {
      // If all the text has been typed, clear the interval
      if (typedText === text) {
        clearInterval(typingInterval);
      } else {
        // Add the next character to the typed text
        setTypedText(typedText + text[typedText.length]);
      }
    }, 300);

    // Clear the interval when the component is unmounted
    return () => clearInterval(typingInterval);
  }, [typedText]);

  return (
    <Container className="d-flex justify-content-center espacios">
      <Col xs={11} md={10} xl={8} className="">
        <div
          className=" dos text-center p-3 d-flex align-items-center justify-content-center"
          data-aos="zoom-in"
        >
          <Col xs={9} md={10} xl={10} className="mt-5 text-justify">
            <h3>{typedText}</h3>
            <br />
            <p className="Jsutificado">
              Bienvenido a nuestra página de trueques estudiantiles, donde los
              estudiantes pueden compartir y obtener recursos de manera
              eficiente y económica. Aquí, podrás intercambiar libros,
              herramientas, y otros artículos útiles para tus estudios con tus
              compañeros de clase y construir una comunidad más colaborativa y
              sostenible. Únete a nosotros y descubre la belleza de la economía
              compartida en el ámbito estudiantil.
            </p>
          </Col>
        </div>
      </Col>
    </Container>
  );
};
