import React from "react";
import TablaItem from "./TablaItem";
import TablaItemFrecuencia from "./TablaItemFrecuencia";
import { useTable } from "@/hooks/useTable";

const TablaGeneral = () => {
  const { limitesReales, limitesClase, marca, frecuencia, listaOrdenada } =
    useTable();
  return (
    <div className="flex gap-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5">
      <TablaItem title="Limites de clases reales" datos={limitesReales} />
      <TablaItem title="Limites de clases" datos={limitesClase} />
      <TablaItem title="Marca de clases" datos={marca} />
      <TablaItemFrecuencia
        title="Frecuencia"
        datos={listaOrdenada}
        intervalos={frecuencia}
      />
    </div>
  );
};

export default TablaGeneral;
