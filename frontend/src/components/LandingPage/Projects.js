import { Container } from "react-bootstrap";
import Services from "./Services";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "animate.css";
export const Projects = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section className="project" id="projects">
      <Container>
        <Services></Services> <br/>
      </Container>
    </section>
  );
};
