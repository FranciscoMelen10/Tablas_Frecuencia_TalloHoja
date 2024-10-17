import { intervalos } from "@/types";

export const obtenerFrecuencia = (lista: number[], intervalos: intervalos) => {
  // Contar cuántos números caen en cada intervalo
  intervalos.forEach((intervalo) => {
    intervalo.contador = 0; // Inicializa el contador para cada intervalo
  });

  lista.forEach((num) => {
    intervalos.forEach((intervalo) => {
      if (
        num >= intervalo.limite_inferior &&
        num <= intervalo.limite_superior
      ) {
        intervalo.contador++; // Aumenta el contador del intervalo correspondiente
      }
    });
  });

  return intervalos;
};


