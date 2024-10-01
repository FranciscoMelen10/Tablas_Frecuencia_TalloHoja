import { Rango, numeroClase } from "../types";

export function obtenerRango(datos: number[]): Rango {
  // Formula: Rango = max - min
  const min = Math.min(...datos);
  const max = Math.max(...datos);
  return {
    minimo: min,
    maximo: max,
    resultado: max - min,
  };
}

export function obtenerNumeroClases(datos: number[]): numeroClase {
  /* 
    n = total de datos
    m = raiz cuadrada de n
    k = m
  */
  const n = datos.length;
  const k = Math.sqrt(n);
  return {
    total: n,
    clase: Math.round(k),
  };
}

export function obtenerAmplitud(datos: number[]): number {
  /* 
    Amplitud = C
    R = Rango
    m = Numero de clases
    Formula: C = R / m
    Formula: Amplitud = Rango / Numero de clases 
  */

  const rango = obtenerRango(datos);
  const clases = obtenerNumeroClases(datos);
  return rango.resultado / clases.clase;
}

// export function obtenerFormulaSturges(datos: number[]): Sturges {
//   // Formula de Sturges para obtener el número de clases
//   // k = 1 + 3.322 * log(n)
//   const n = datos.length;
//   const k = Math.sqrt(n);
//   return {
//     total: n,
//     clase: Math.round(k),
//   };
// }
