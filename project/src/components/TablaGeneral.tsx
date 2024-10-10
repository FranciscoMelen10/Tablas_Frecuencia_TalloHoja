import React from "react";
import TablaItem from "./TablaItem";
import TablaItemFrecuencia from "./TablaItemFrecuencia";
import { useTable } from "@/hooks/useTable";

const TablaGeneral = () => {
  const { limitesReales, limitesClase, marca, frecuencia, listaOrdenada } =
    useTable();
  return (
    <div className="flex flex-wrap justify-center gap-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5">
      <TablaItem title="Limites reales" datos={limitesReales} />
      <TablaItem title="Clases" datos={limitesClase} />
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
