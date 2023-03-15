import { Container, Col } from "react-bootstrap";
import { Newsletter } from "./Newsletter";
import logo from "../../assets/img/SVG/Logo.svg";

export const Footer = () => {
  return (
    <footer className="footer d-flex h-100">
      <Container className="mt-5"><br/>
        <Newsletter ></Newsletter><br/><br/>
        <Col
          size={12}
          sm={12}
          className="mt-4 d-flex justify-content-between align-items-center"
        >
          <img src={logo} alt="Logo" className="LogoIconFooter" />
          <p className="text-dark">Xchange Life - All Rights Reserved 2023 </p>
        </Col>
      </Container>
      
    </footer>
  );
};



