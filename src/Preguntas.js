import "./App.css";
import { db } from "./utils/firebase.js";
import { push, set, ref } from "firebase/database";
import { useState } from "react";
import { useModal } from "./hooks/useModal.js";
import ModalEnviada from "./ModalEnviada.js";
import manzana1 from "./imagenesFlores/MFA1-01.png";
import manzana2 from "./imagenesFlores/MFA2-01.png";
import manzana3 from "./imagenesFlores/MFA3-01.png";
import manzana4 from "./imagenesFlores/MFA4-01.png";
import manzana5 from "./imagenesFlores/MFA5-01.png";

export default function Preguntas() {
  const [pregunta, setPregunta] = useState({ proyectada: false });
  const [isOpenConfirm, openConfirm, closeConfirm] = useModal(false);

  function agregarPregunta(e) {
    e.preventDefault();
    const form = document.getElementById("formulario");
    const nuevaRef = push(ref(db, "preguntas"));
    openConfirm();
    setTimeout(() => {
      closeConfirm();
      form.reset();
    }, 3000);
    return set(nuevaRef, pregunta);
  }

  function changeHandler(e) {
    const muyLargo = document.getElementById("muyLargo");
    if (e.target.name === "pregunta" && e.target.value.length > 120) {
      muyLargo.classList.add("mostrar");
    } else if (e.target.name === "pregunta") {
      muyLargo.classList.remove("mostrar");
    }
    if (e.target.name === "nombre" && e.target.value.length > 19) {
      muyLargo.classList.add("mostrar");
    } else if (e.target.name === "nombre") {
      muyLargo.classList.remove("mostrar");
    }
    setPregunta({
      ...pregunta,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <>
      {isOpenConfirm && <ModalEnviada />}
      <div className="encabezado">
        <h1>MANZANA EN FLOR</h1>
        <h3>Escribí tu pregunta</h3>
      </div>
      <div className="preguntas_contPregunta">
        <div id="muyLargo">
          <p>Máximo de caracteres alcanzado</p>
        </div>
        <form id="formulario">
          <label htmlFor="nombre">Nombre:</label>
          <input
            maxLength="20"
            placeholder="tu nombre"
            className="preguntas_inputNombre"
            type="text"
            name="nombre"
            onChange={changeHandler}
          ></input>
          <label htmlFor="pregunta">Pregunta:</label>
          <textarea
            maxLength="121"
            placeholder="tu pregunta"
            rows="4"
            className="preguntas_inputPregunta"
            type="text"
            name="pregunta"
            onChange={changeHandler}
          ></textarea>
          <div className="preguntas_contBoton">
            <button
              className="preguntas_boton"
              onClick={(e) => agregarPregunta(e)}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
      <div className="preguntas_contImg">
        {/* ball */}
        <div className="manzanaImg">
          <img src={manzana1}></img>
          <img src={manzana2}></img>
          <img src={manzana3}></img>
          <img src={manzana4}></img>
          <img src={manzana5}></img>
        </div>
      </div>
    </>
  );
}
