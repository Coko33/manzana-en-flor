import "./App.css";
import { db } from "./utils/firebase.js";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import Qr from "./otrosComponentes/Qr";
import Titulos from "./otrosComponentes/Titulos";

export default function Proyeccion() {
  const [elegida, setElegida] = useState(null);
  const [texto, setTexto] = useState("");
  const [enProyeccion, setEnProyeccion] = useState("");

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
    console.log("1er Effect");
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
      console.log("2do Effect");
      const intervalId = wordflick();
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [elegida]);

  useEffect(() => {
    console.log("3do Effect");
    const enProyeccionRef = ref(db, "enProyeccion");
    const unsubscribe = onValue(enProyeccionRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setEnProyeccion(data);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="proy_contenedor">
        {enProyeccion === "preguntas" && (
          <div className="fade-container">
            {elegida && <h1 className="fade-text">{texto}</h1>}
          </div>
        )}
        {enProyeccion === "QR" && <Qr />}
        {enProyeccion === "titulos" && <Titulos />}
      </div>
    </>
  );
}
