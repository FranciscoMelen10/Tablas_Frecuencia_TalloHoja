import { Distribucion_frecuencia_Props } from "@/types";

export default function Distribucion_frecuencia({
  maximo,
  minimo,
  resultado,
  total,
  amplitud,
}: Distribucion_frecuencia_Props) {
  return (
    <>
      <h3>Rango: {`${maximo} - ${minimo} = ${resultado}`}</h3>
      <h3>Numero de Clases:{total}</h3>
      <h3>Amplitud:{amplitud.toFixed(2)}</h3>
    </>
  );
}
