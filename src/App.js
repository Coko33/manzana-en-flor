
import './App.css';
import "./fuentes/BarlowSemiCondensed-Black_Manzana.ttf"
import { Routes, Route, HashRouter, BrowserRouter } from "react-router-dom";
import Admin from './Admin';
import Preguntas from './Preguntas';
import Proyeccion from './Proyeccion';

function App() {
  return (
    <HashRouter>
    <Routes>
      <Route path="/" element={<Preguntas/>} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/proyeccion" element={<Proyeccion/>} />
    </Routes>
    </HashRouter>
    
  );
}

export default App;
