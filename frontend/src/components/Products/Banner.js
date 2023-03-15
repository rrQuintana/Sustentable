import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "animate.css";
import { NavBar } from "../LandingPage/NavBar";
import "aos/dist/aos.css";
import "./Products.css";

import Button from '@mui/material/Button';
import { Link } from "react-router-dom";


export const Banner = () => {

  //Funciones para animar texto
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ["Intercambia", "Ahorra", "Recicla", "Cambia", "Adquiere", "Ofrece", "Encuentra"];
  const period = 1000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(100);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <>
      <NavBar></NavBar>
      
      <section
        className="products-banner h-custom vh-100 d-flex justify-content-center align-items-center"
        id="home"
      >
        <Container
          className="d-flex justify-content-center align-items-center "
          id="Banner-Text-container "
        >
          <div className="Letras w-100" id="Banner-Text">
            <div data-aos="fade-right ">
              <h1 className="text-black w-50">
                Lo que necesitas para tus estudios en un solo lugar
              </h1>
              <h2>
                <span
                  className="txt-rotate size"
                  data-rotate='[ "Intercambia", "Ahorra", "Recicla", "Cambia", "Adquiere", "Ofrece", "Encuentra" ]'
                >
                  <span className="wrap text-dark">{text}</span>
                </span>
              </h2>

            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
