import React from "react";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";

function ProductCart({_id, titulo, contenido, categoria, precio, foto}) {
  return (
    <Link to={"/ProductPage/" + _id} style={{ textDecoration: "none" }} data-aos="fade-up">
      <div className=" product-bx d-flex row flex-wrap justify-content-center align-items-center">
        <div className="product-img-container my-2 d-flex flex-wrap justify-content-center align-items-center">
          <img src={foto} alt="imagen producto" style={{ width: 230, height: 230 }}/>
        </div>
        <h4 className="product-bx-h">{titulo}</h4>
        <div className="product-bx-p-description">{contenido}</div>
        <p className="product-bx-p mt-2">Acepta artículos de:</p>
        <div className="product-items-box d-flex flex-wrap justify-content-center align-items-center">
          <span>{precio}</span>
        </div>
        <p className="mt-2">Categoría: {categoria}</p>
      </div>
    </Link>
  );
}

export default ProductCart;