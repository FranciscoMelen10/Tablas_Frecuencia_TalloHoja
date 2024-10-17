import { LimitesClases, LimitesClasesProps, MarcaClase } from "@/types";

export const limites_clases = ({
  min,
  max,
  amplitud,
  isReal = false,
}: LimitesClasesProps): LimitesClases => {
  // Estructura: [ min - 0.5 - min + amplitud - 0.5 ])

  // Si es una clase real, se resta 0.5 a los limites
  // para que no se repitan los datos
  const real = isReal ? 0.5 : 0;

  let limites: string[] = [];
  let intervalos: Omit<LimitesClases, "limites">["intervalos"] = [];
  let limite_inferior = min;
  let limite_superior = min + amplitud;

  while (limite_superior < max + amplitud) {
    // Para la tabla de limites
    limites.push(`[ ${limite_inferior - real} - ${limite_superior + real} )`);

    // Para la tabla de frecuencia
    intervalos.push({
      limite_inferior: limite_inferior - real,
      limite_superior: limite_superior + real,
      contador: 0,
    });
    limite_inferior = limite_superior + 1;
    limite_superior += amplitud + 1;
  }

  return {
    limites: limites,
    intervalos: intervalos,
  };
};

export const marca_clase = ({ min, amplitud, numero_clase }: MarcaClase) => {
  let marcas: number[] = [];
  let marcas_clase: number[] = [];

  for (let i = 0; i <= numero_clase; i++) {
    marcas.push(min);
    min += amplitud + 1;
  }

  for (let i = 0; i < numero_clase; i++) {
    marcas_clase.push((marcas[i] + marcas[i + 1]) / 2 - 0.5);
  }

  return marcas_clase;
};
