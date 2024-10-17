"use client";
import { useTable } from "@/hooks/useTable";
import { obtenerFrecuencia } from "@/utils/frecuencia";
import { useEffect } from "react";

type TablaItemFrecuenciaProps = {
  datos: number[];
  intervalos: Array<{
    limite_inferior: number;
    limite_superior: number;
    contador: number;
  }>;
  title: string;
  total_frecuencia: number;
};

export default function TablaItemFrecuencia({
  datos = [],
  title,
  intervalos,
  total_frecuencia,
}: TablaItemFrecuenciaProps) {
  const {
    obtenerFrecuencias,
    obtenerFrecuenciaRelativa,
    marca,
    obtenerFrecuenciaXiFi,
    obtenerFrecuenciaXiFi2,
    setTotal_frecuencia_XiFi2,
    setPromedio
  } = useTable();

  // Obtener la frecuencia de los datos en los intervalos
  const frecuencias = obtenerFrecuencia(datos, intervalos);

  // Frecuencias
  let frecuencia_acumuladas: number[] = [];
  let frecuencia_relativa: number[] = [];
  let frecuencia_porcentual: number[] = [];
  let frecuencia_XiFi: number[] = [];
  let frecuencia_XiFi2: number[] = [];

  // Totales de frecuencias
  let total: number = 0;
  let total_frecuencia_relativa: number = 0;
  let total_frecuencia_porcentual: number = 0;
  let total_XiFi: number = 0;
  let total_XiFi2: number = 0;

  for (let i = 0; i < total_frecuencia; i++) {
    if (i === 0) {
      frecuencia_acumuladas.push(frecuencias[i].contador);
    } else {
      frecuencia_acumuladas.push(
        frecuencias[i].contador + frecuencia_acumuladas[i - 1]
      );
    }

    frecuencia_relativa.push(frecuencias[i].contador / datos.length);
    frecuencia_porcentual.push((frecuencias[i].contador / datos.length) * 100);

    // Calcular el total de frecuencias
    total_frecuencia_relativa += frecuencias[i].contador / datos.length;
    total_frecuencia_porcentual +=
      (frecuencias[i].contador / datos.length) * 100;
    total_XiFi += frecuencias[i].contador * marca[i];
    total += frecuencias[i].contador;
  }

  // Promedio de los datos (x̄)
  const promedio = total_XiFi / total;

  // Calcular la frecuencia Xi * Fi y (Xi - x̄)²
  for (let i = 0; i <= total_frecuencia; i++) {
    if (intervalos[i]) {
      frecuencia_XiFi.push(intervalos[i].contador * marca[i]);
      frecuencia_XiFi2.push(
        intervalos[i].contador * Math.pow(marca[i] - promedio, 2)
      );
      total_XiFi2 += intervalos[i].contador * Math.pow(marca[i] - promedio, 2);
    }
  }

  // Actualizar la frecuencia acumulada usando useEffect para evitar el ciclo infinito
  useEffect(() => {
    obtenerFrecuencias(frecuencia_acumuladas);
    obtenerFrecuenciaRelativa(frecuencia_relativa);
    obtenerFrecuenciaXiFi(frecuencia_XiFi);
    obtenerFrecuenciaXiFi2(frecuencia_XiFi2);
    setTotal_frecuencia_XiFi2(total_XiFi2);
    setPromedio(promedio);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2">
        <h5 className="text-center">{title}</h5>
        {intervalos.map((data, index) => (
          <p
            key={index}
            className="bg-gray-700 rounded-xl p-2 text-center font-medium hover:bg-gray-600 transition-colors"
          >
            {data.contador}
          </p>
        ))}
        <p className="bg-gray-700 rounded-xl p-2 text-center font-medium hover:bg-gray-600 transition-colors">
          {`Total: ${total}`}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h5 className="text-center text-sm">N</h5>
        {frecuencia_acumuladas.map((data, index) => (
          <p
            key={index}
            className="bg-gray-700 rounded-xl p-2 text-center font-medium hover:bg-gray-600 transition-colors"
          >
            {data}
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <h5 className="text-center text-sm">Fr</h5>
        {intervalos.map((data, index) => (
          <p
            key={index}
            className="bg-gray-700 rounded-xl p-2 text-center font-medium hover:bg-gray-600 transition-colors"
          >
            {(data.contador / datos.length).toFixed(2)}
          </p>
        ))}
        <p className="bg-gray-700 rounded-xl p-2 text-center font-medium hover:bg-gray-600 transition-colors">
          {`Total: ${total_frecuencia_relativa.toFixed(2)}`}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h5 className="text-center text-sm">F%</h5>
        {intervalos.map((data, index) => (
          <p
            key={index}
            className="bg-gray-700 rounded-xl p-2 text-center font-medium hover:bg-gray-600 transition-colors"
          >
            {`${((data.contador / datos.length) * 100).toFixed(2)}%`}
          </p>
        ))}
        <p className="bg-gray-700 rounded-xl p-2 text-center font-medium hover:bg-gray-600 transition-colors">
          {`Total: ${total_frecuencia_porcentual.toFixed(2)}%`}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h5 className="text-center text-sm">Xi * Fi</h5>
        {frecuencia_XiFi.map((data, index) => (
          <p
            key={index}
            className="bg-gray-700 rounded-xl p-2 text-center font-medium hover:bg-gray-600 transition-colors"
          >
            {data}
          </p>
        ))}
        <p className="bg-gray-700 rounded-xl p-2 text-center font-medium hover:bg-gray-600 transition-colors">
          {`Total: ${total_XiFi}`}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h5 className="text-center text-sm">(Xi - x̄)</h5>
        {marca.map((data: number, index: number) => {
          if (index < total_frecuencia) {
            return (
              <p
                key={index}
                className="bg-gray-700 rounded-xl p-2 text-center font-medium hover:bg-gray-600 transition-colors"
              >
                {`(${data} - ${promedio.toFixed(2)})`}
              </p>
            );
          }
        })}
      </div>
      <div className="flex flex-col gap-2">
        <h5 className="text-center text-sm">(Xi - x̄)²</h5>
        {marca.map((data: number, index: number) => {
          if (index < total_frecuencia) {
            return (
              <p
                key={index}
                className="bg-gray-700 rounded-xl p-2 text-center font-medium hover:bg-gray-600 transition-colors"
              >
                {`(${(data - promedio).toFixed(2)})²`}
              </p>
            );
          }
        })}
      </div>

      <div className="flex flex-col gap-2">
        <h5 className="text-center text-sm">Fi(Xi - x̄)²</h5>
        {frecuencia_XiFi2.map((data: number, index: number) => (
          <p
            key={index}
            className="bg-gray-700 rounded-xl p-2 text-center font-medium hover:bg-gray-600 transition-colors"
          >
            {`${data.toFixed(2)}`}
          </p>
        ))}
        <p className="bg-gray-700 rounded-xl p-2 text-center font-medium hover:bg-gray-600 transition-colors">
          {`Total: ${total_XiFi2.toFixed(2)}`}
        </p>
      </div>
    </>
  );
}
