import "./../App.css";
import { db } from "./../utils/firebase.js";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function Proyeccion() {
  const [elegida, setElegida] = useState();
  console.log(elegida);

  useEffect(() => {
    const container = document.querySelector(".fade-container");
    const elegidaRef = ref(db, "elegida");
    const unsubscribe = onValue(elegidaRef, (snapshot) => {
      const data = snapshot.val();

      if (container) {
        container.classList.remove("fade-in");
        container.classList.add("fade-out");
        setTimeout(() => {
          setElegida(data);
          container.classList.remove("fade-out");
          container.classList.add("fade-in");
        }, 2000);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="proy_contenedor">
        <div className="fade-container">
          {elegida && <h1 className="fade-text">{elegida.pregunta}</h1>}
        </div>
      </div>
    </>
  );
}
