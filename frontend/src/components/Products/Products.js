import React from "react";
import { Banner } from "./Banner";
import ProductList from "./ProductList";

function Products() {
  return (
    <div className="Page-products">
      <Banner />      
      <ProductList />
    </div>
  );
}

export default Products;
