"use client";
import { useTable } from "@/hooks/useTable";
import { obtenerFrecuencia } from "@/utils/frecuencia";
import { use, useEffect } from "react";

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
  const { obtenerFrecuencias, obtenerFrecuenciaRelativa } = useTable();

  // Obtener la frecuencia de los datos en los intervalos
  const frecuencias = obtenerFrecuencia(datos, intervalos);
  let frecuencia_acumuladas: number[] = [];
  let frecuencia_relativa: number[] = [];
  let frecuencia_porcentual: number[] = [];

  for (let i = 0; i < frecuencias.length; i++) {
    if (i === 0) {
      frecuencia_acumuladas.push(frecuencias[i].contador);
    } else {
      frecuencia_acumuladas.push(
        frecuencias[i].contador + frecuencia_acumuladas[i - 1]
      );
    }
    frecuencia_relativa.push(frecuencias[i].contador / datos.length);
    frecuencia_porcentual.push((frecuencias[i].contador / datos.length) * 100);
  }

  // Actualizar la frecuencia acumulada usando useEffect para evitar el ciclo infinito
  useEffect(() => {
    obtenerFrecuencias(frecuencia_acumuladas);
    obtenerFrecuenciaRelativa(frecuencia_relativa);
  }, []);

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
        {frecuencia_acumuladas.map((data, index) => (
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
            {(data.contador / datos.length).toFixed(2)}
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
