import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import "animate.css";
import { NavBar } from "./NavBar";
import "aos/dist/aos.css";

export const Banner = () => {

  //Todas estas funciones son para dar algunas animaciones al texto
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ["Intercambia", "Ahorra", "Recicla"];
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
        className="banner h-custom vh-100 d-flex justify-content-center align-items-center "
        id="home"
      >
        <Container
          className="d-flex justify-content-center align-items-center "
          id="Banner-Text-container "
        >
          <div className="Letras w-100" id="Banner-Text">
            <div data-aos="fade-right ">
              <h1 className="text-black">Xchange Life</h1>
              <h1>
                <span
                  className="txt-rotate size text-black"
                  data-rotate='[ "Intercambia", "Ahorra", "Recicla" ]'
                >
                  <span className="wrap">{text}</span>
                </span>
              </h1>
            </div>
            <div data-aos="fade-right">
              <h2 className="text-black">El futuro es el trueque, únete a nosotros hoy</h2>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
