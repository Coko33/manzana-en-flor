import {db} from "./utils/firebase.js"
import { set, onValue, ref, update } from "firebase/database";
import { useEffect, useState } from "react";

export default function Admin() {
  const [preguntas, setPreguntas] = useState([]);
  const [preguntaSeleccionada, setPreguntaSeleccionada] = useState(null);

  useEffect(() => {
    const preguntasRef = ref(db, "preguntas");
    const unsubscribe = onValue(preguntasRef, (snapshot) => {
      const data = snapshot.val();
      const arrayDePreguntas = Object.keys(data).map((key)=>{
        const {nombre, pregunta, proyectada} = data[key];
        return {id: key, nombre, pregunta, proyectada};
      });
      setPreguntas(arrayDePreguntas);
    });
    return () => {
      unsubscribe();
    };
  }, []); 

  function proyectar(elegida) {
    set(ref(db, 'elegida'), {
      nombre: elegida.nombre,
      pregunta: elegida.pregunta
    })
    update(ref(db, "preguntas" + "/" + elegida.id), {
      proyectada: true
    })
    setPreguntaSeleccionada(elegida.id);
  }
    return (
        <>
        <div className="encabezado">
            <h1>MANZANA EN FLOR</h1>
            <h3>Moderador</h3>
        </div>
        <div className="admin_contDosTablas">
          <div className="admin_contTabla">
          <h6 className="admin_tituloTabla">Pendientes:</h6>
          <table>
            <thead>
              <tr>
                <th className="thNombre">Nombre:</th>
                <th>Pregunta:</th>
                <th className="thBoton"></th>
              </tr>
            </thead>
            <tbody> 
              {preguntas !== [] && preguntas.map((pr)=>(
                !pr.proyectada &&
                <tr key={pr.id} >
                  <td>{pr.nombre}</td>
                  <td>{pr.pregunta}</td>
                  <td><button onClick={()=>proyectar(pr)}>Proyectar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div className="admin_contTabla">
          <h6 className="admin_tituloTabla">Proyectadas:</h6>
          <table>
            <thead>
              <tr>
                <th className="thNombre">Nombre:</th>
                <th>Pregunta:</th>
                <th className="thBoton"></th>
              </tr>
            </thead>
            <tbody> 
              {preguntas !== [] && preguntas.map((pr)=>(
                pr.proyectada &&
                <tr key={pr.id} style={{ backgroundColor: pr.id === preguntaSeleccionada ? 'palegreen' : 'transparent' }}>
                  <td>{pr.nombre}</td>
                  <td>{pr.pregunta}</td>
                  <td><button onClick={()=>proyectar(pr)}>Volver a proyectar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          </div>
      </>
    )
}