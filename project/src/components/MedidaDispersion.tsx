import React from "react";
import { useTable } from "@/hooks/useTable";

const MedidaDispersion = () => {
  const {
    delta,
    delta1,
    delta2,
    moda,
    mediana,
    desviacionEstandar,
    coeficienteVariacion,
    promedio,
    varianza
  } = useTable();

  return (
    <div className="flex justify-center gap-2 flex-col bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5">
      <h3 className="text-2xl bg-gray-700 rounded-xl p-2 text-center hover:bg-gray-600 transition-colors">
        Promedio: {promedio.toFixed(2)}
      </h3>
      <h3 className="text-2xl bg-gray-700 rounded-xl p-2 text-center hover:bg-gray-600 transition-colors">
        Frecuencia mayor: {delta}
      </h3>
      <h3 className="text-2xl bg-gray-700 rounded-xl p-2 text-center hover:bg-gray-600 transition-colors">
        ▲1: {delta1}
      </h3>
      <h3 className="text-2xl bg-gray-700 rounded-xl p-2 text-center hover:bg-gray-600 transition-colors">
        ▲2: {delta2}
      </h3>
      <h3 className="text-2xl bg-gray-700 rounded-xl p-2 text-center hover:bg-gray-600 transition-colors">
        Moda: {moda.toFixed(2)}
      </h3>
      <h3 className="text-2xl bg-gray-700 rounded-xl p-2 text-center hover:bg-gray-600 transition-colors">
        Mediana: {mediana.toFixed(2)}
      </h3>
      <h3 className="text-2xl bg-gray-700 rounded-xl p-2 text-center hover:bg-gray-600 transition-colors">
        Varianza: {varianza.toFixed(2)}
      </h3>
      <h3 className="text-2xl bg-gray-700 rounded-xl p-2 text-center hover:bg-gray-600 transition-colors">
        Desviación estandar: {desviacionEstandar.toFixed(2)}
      </h3>
      <h3 className="text-2xl bg-gray-700 rounded-xl p-2 text-center hover:bg-gray-600 transition-colors">
        Coeficiente variacion: {coeficienteVariacion.toFixed(2)}
      </h3>
    </div>
  );
};

export default MedidaDispersion;
