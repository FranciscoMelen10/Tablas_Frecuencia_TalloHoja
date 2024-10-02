import { TablaGeneralProps } from "@/types";
import React from "react";
import TablaItem from "./TablaItem";

const TablaGeneral = ({
  limites_reales,
  limites_clases,
  //   f,
  marca_clase,
}: //   frecuencia_relativa,
//   frecuencia_acumulada,
//   frecuencia_porcentual,
TablaGeneralProps) => {
  return (
    <div className="flex gap-4">
      <TablaItem datos={limites_clases} />
      <TablaItem datos={limites_reales} />
      <TablaItem datos={marca_clase} />
    </div>
  );
};

export default TablaGeneral;
