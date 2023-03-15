import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";

function Error404() {
    const { isAuthenticated } = useContext(AuthContext);
    console.error(`Error404: ${isAuthenticated}`);
  return (
    <div>Error404</div>
  )
}

export default Error404