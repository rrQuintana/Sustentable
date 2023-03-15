import { NavBar } from "../LandingPage/NavBar";
import { AuthContext } from "../../AuthContext";
import React, { useState, useContext, useEffect } from "react";
import "./EditP.css";

function EditarPersona() {
    const { isAuthenticated } = useContext(AuthContext); //Saber si el usuario está autenticado
    return (
        <>
            <NavBar></NavBar>
            <div class="todo">
                <div class="signupFrm">
                    <form action="" class="form">
                        <h1 class="title">Agregar Persona</h1>

                        <div class="inputContainer">
                            <input type="text" class="input" placeholder="a" />
                            <label for="" class="label">Nombre</label>
                        </div>

                        <div class="inputContainer">
                            <input type="text" class="input" placeholder="a" />
                            <label for="" class="label">Apellido</label>
                        </div>

                        <div class="inputContainer">
                            <input type="text" class="input" placeholder="a" />
                            <label for="" class="label">Foto</label>
                        </div>

                        <div class="inputContainer">
                            <input type="text" class="input" placeholder="a" />
                            <label for="" class="label">Telefono</label>
                        </div>

                        <div class="inputContainer">
                            <input type="text" class="input" placeholder="a" />
                            <label for="" class="label">Direccion</label>
                        </div>

                        <div class="inputContainer">
                            <input type="text" class="input" placeholder="a" />
                            <label for="" class="label">Contacto</label>
                        </div>

                        <input type="submit" class="submitBtn" value="Sign up" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditarPersona;