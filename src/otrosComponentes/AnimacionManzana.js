import "./AnimacionManzana.css";
import Mask1 from "../imagenesFlores/Mask1";
import Mask2 from "../imagenesFlores/Mask2";
import Mask3 from "../imagenesFlores/Mask3";
import Mask4 from "../imagenesFlores/Mask4";
import Mask5 from "../imagenesFlores/Mask5";
export default function AnimacionManzana() {
  return (
    <div className="contenedor_animManzana">
      <Mask1 className="m1"></Mask1>
      <Mask2></Mask2>
      <Mask3></Mask3>
      <Mask4></Mask4>
      <Mask5></Mask5>
    </div>
  );
}
