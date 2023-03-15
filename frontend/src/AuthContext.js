//
import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }) => {

  const [ isAuthenticated, setIsAuthenticated] = useState(false);
  const [ isUser, setUser] = useState(null);
  const [ UserData, setUserData ] = useState([]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isUser, setUser, UserData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
//isUser es la información que proporciona la autenticación de firebase la cual utilizamos para obtener los datos de correo y en un futuro la foto de perfil
//UserData es la información que se obtiene de la base de datos de mongo la cual utilizamos para obtener los datos de nombre, apellido, etc.

//Este contexto se usa para saber de forma global si hay un usuario autenticado y para establecer si un usuario está autenticado. 
//También se usa para obtener el objeto usuario y para establecer el objeto usuario.