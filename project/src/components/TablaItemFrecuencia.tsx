import { obtenerFrecuencia } from "@/utils/frecuencia";

type TablaItemFrecuenciaProps = {
  datos: number[];
  intervalos: Array<{
    limite_inferior: number;
    limite_superior: number;
    contador: number;
  }>;
  title: string;
};

export default function TablaItemFrecuencia({
  datos = [],
  title,
  intervalos,
}: TablaItemFrecuenciaProps) {
  // Obtener la frecuencia de los datos en los intervalos
  const { intervalos: frecuencias } = obtenerFrecuencia(datos, intervalos);
  let frecuencia_acumulada: number[] = [];

  for (let i = 0; i < intervalos.length; i++) {
    if (i === 0) {
      frecuencia_acumulada.push(intervalos[i].contador);
    } else {
      frecuencia_acumulada.push(
        intervalos[i].contador + frecuencia_acumulada[i - 1]
      );
    }
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2">
        <h5 className="text-center">{title}</h5>
        {intervalos.map((data, index) => (
          <div
            key={index}
            className="bg-gray-700 rounded-xl p-2 text-center font-medium hover:bg-gray-600 transition-colors"
          >
            {data.contador}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <h5 className="text-center text-sm">Frecuencia Acumulada</h5>
        {frecuencia_acumulada.map((data, index) => (
          <div
            key={index}
            className="bg-gray-700 rounded-xl p-2 text-center font-medium hover:bg-gray-600 transition-colors"
          >
            {data}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <h5 className="text-center text-sm">Frecuencia Relativa</h5>
        {intervalos.map((data, index) => (
          <div
            key={index}
            className="bg-gray-700 rounded-xl p-2 text-center font-medium hover:bg-gray-600 transition-colors"
          >
            {data.contador / datos.length}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <h5 className="text-center text-sm">Frecuencia Porcentual</h5>
        {intervalos.map((data, index) => (
          <div
            key={index}
            className="bg-gray-700 rounded-xl p-2 text-center font-medium hover:bg-gray-600 transition-colors"
          >
            {`${((data.contador / datos.length) * 100).toFixed(2)}%`}
          </div>
        ))}
      </div>
    </div>
  );
}
