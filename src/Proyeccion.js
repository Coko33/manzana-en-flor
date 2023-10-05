import "./App.css";
import { db } from "./utils/firebase.js";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import manzana1 from "./imagenesFlores/MFA1-01.png";
import manzana2 from "./imagenesFlores/MFA2-01.png";
import manzana3 from "./imagenesFlores/MFA3-01.png";
import manzana4 from "./imagenesFlores/MFA4-01.png";
import manzana5 from "./imagenesFlores/MFA5-01.png";

export default function Proyeccion() {
  const [elegida, setElegida] = useState(null);
  const [texto, setTexto] = useState("");

  let intervalId;

  const wordflick = function () {
    let offset = 0;
    let forwards = true;
    let skip_count = 0;
    let skip_delay = 15;
    let speed = 70;
    intervalId = setInterval(function () {
      if (forwards) {
        console.log(elegida.pregunta.length);
        if (offset >= elegida.pregunta.length) {
          ++skip_count;
          if (skip_count === skip_delay) {
            forwards = false;
            skip_count = 0;
          }
        }
      }

      const part = elegida.pregunta.substr(0, offset);
      if (skip_count === 0) {
        if (forwards) {
          offset++;
        }
        /* else {
          offset--;
        } */
      }
      setTexto(part);
    }, speed);
    return intervalId;
  };

  useEffect(() => {
    /* const container = document.querySelector(".fade-container"); */
    const elegidaRef = ref(db, "elegida");
    const unsubscribe = onValue(elegidaRef, (snapshot) => {
      const data = snapshot.val();
      setElegida(data);
      if (intervalId) {
        clearInterval(intervalId);
      }
    });
    return () => {
      unsubscribe();
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  useEffect(() => {
    if (elegida) {
      console.log(elegida);
      const intervalId = wordflick();
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [elegida]);

  // ...

  return (
    <>
      <div className="proy_contenedor">
        <div className="fade-container">
          {elegida && <h1 className="fade-text">{texto}</h1>}
        </div>
      </div>
      {/*  <div className="preguntas_contImg proy">
        <div className="manzanaImg ball proy">
          <img src={manzana1}></img>
          <img src={manzana2}></img>
          <img src={manzana3}></img>
          <img src={manzana4}></img>
          <img src={manzana5}></img>
        </div>
      </div> */}
    </>
  );
}
