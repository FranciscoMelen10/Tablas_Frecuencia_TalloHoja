import React from "react";
import TablaItem from "./TablaItem";
import TablaItemFrecuencia from "./TablaItemFrecuencia";
import { useTable } from "@/hooks/useTable";

const TablaGeneral = () => {
  const { limitesReales, limitesClase, marca, frecuencia, listaOrdenada } =
    useTable();

    const total = limitesClase.length

  return (
    <div className="flex flex-wrap justify-center gap-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5">
      <TablaItem title="Limites reales" datos={limitesReales} total={total}/>
      <TablaItem title="Clases" datos={limitesClase} total={total}/>
      <TablaItem title="Marca de clases" datos={marca} total={total} />
      <TablaItemFrecuencia
        title="Frecuencia"
        datos={listaOrdenada}
        intervalos={frecuencia}
        total_frecuencia={total}
      />

    </div>
  );
};

export default TablaGeneral;
