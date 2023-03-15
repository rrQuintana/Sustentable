import { Col } from "react-bootstrap";

export const ProjectCard = ({ title, description, demoLink, imgUrl, icon }) => {
  return (
    <Col size={12} sm={6} md={4} data-aos="fade-up">
      <div className="proj-imgbx">
        <img src={imgUrl} />
        <div className="proj-txtx">
          <h4 className="text-light">{title}</h4>
          <p className="text-light">{description}</p>
          {demoLink}
        </div>
        {}
      </div>
      <div className="mb-4 text-center">
        <p className="mt-3">Creado con:</p>
        {icon}
      </div>
    </Col>
  );
};
