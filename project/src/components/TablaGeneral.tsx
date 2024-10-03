import { TablaGeneralProps } from "@/types";
import React from "react";
import TablaItem from "./TablaItem";
import TablaItemFrecuencia from "./TablaItemFrecuencia";

const TablaGeneral = ({
  lista,
  limites_reales,
  limites_clases,
  f,
  marca_clase,
}: 
TablaGeneralProps) => {
  return (
    <div className="flex gap-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5">
      <TablaItem title="Limites de clases reales" datos={limites_reales} />
      <TablaItem title="Limites de clases" datos={limites_clases} />
      <TablaItem title="Marca de clases" datos={marca_clase} />
      <TablaItemFrecuencia title="Frecuencia" datos={lista} intervalos={f} />
    </div>
  );
};

export default TablaGeneral;
