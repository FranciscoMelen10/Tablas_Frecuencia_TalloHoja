import {
  CoeficienteVariacionProps,
  DesviacionEstandarProps,
  intervalos,
  MedianaProps,
  ModaProps,
  VarianzaProps,
} from "@/types";

export const obtenerFrecuenciaMayor = (frecuencia: intervalos) => {
  let frecuencia_mayor = 0;
  let indices_mayores: number[] = [];

  // Paso 1: Encontrar la frecuencia mayor
  frecuencia.forEach((item, index) => {
    if (item.contador > frecuencia_mayor) {
      frecuencia_mayor = item.contador;
      indices_mayores = [index]; // Reinicia la lista con el nuevo mayor
    } else if (item.contador === frecuencia_mayor) {
      indices_mayores.push(index); // Agrega el índice si la frecuencia es igual
    }
  });

  // Paso 2: Filtrar fuera el primer y último índice, si hay otros disponibles
  const indices_validos = indices_mayores.filter(
    (index) => index !== 0 && index !== frecuencia.length - 1
  );

  // Paso 3: Elegir el índice más cercano al centro
  const indice_centro = (frecuencia.length - 1) / 2;
  let indice_final = 0;

  /* 
      La función Math.abs() en JavaScript se utiliza para obtener el valor absoluto de un número. El valor absoluto es el número sin su signo, lo que significa que convierte números negativos en positivos.
  
      En el contexto de la función que te compartí, Math.abs() se usa para calcular la distancia entre dos números sin importar si la diferencia es positiva o negativa.
  
      Math.abs(5 - 3) // Resultado: 2
      Math.abs(3 - 5) // Resultado: 2
    */

  if (indices_validos.length > 0) {
    indice_final = indices_validos.reduce((prev, curr) =>
      Math.abs(curr - indice_centro) < Math.abs(prev - indice_centro)
        ? curr
        : prev
    );
  } else {
    // Si no hay opciones válidas, permitimos el primero o último índice
    indice_final = indices_mayores.reduce((prev, curr) =>
      Math.abs(curr - indice_centro) < Math.abs(prev - indice_centro)
        ? curr
        : prev
    );
  }

  const frecuencia_anterior = frecuencia[indice_final - 1]
    ? frecuencia[indice_final - 1].contador
    : 0;
  const frecuencia_superior = frecuencia[indice_final + 1]
    ? frecuencia[indice_final + 1].contador
    : 0;

  return {
    frecuencia_anterior: frecuencia_anterior,
    frecuencia_mayor: frecuencia_mayor,
    frecuencia_superior: frecuencia_superior,
    indice: indice_final,
  };
};

export const obtenerModa = ({
  amplitud,
  delta1,
  delta2,
  limite_inferior,
}: ModaProps) => {
  console.log(Math.round(amplitud), delta1, delta2, limite_inferior);
  return limite_inferior + (delta1 / (delta1 + delta2)) * Math.round(amplitud);
};

export const obtenerMediana = ({
  amplitud,
  limite_inferior,
  n,
  frecuencia_acumulada_anterior,
  frecuencia,
}: MedianaProps) => {
  return (
    limite_inferior +
    ((n / 2 - frecuencia_acumulada_anterior) / frecuencia) *
      Math.round(amplitud)
  );
};

export const obtenerVarianza = ({
  n,
  total_frecuencia_XiFi2,
}: VarianzaProps) => {
  return total_frecuencia_XiFi2 / (n - 1);
};

export const obtenerDesviacionEstandar = ({
  varianza,
}: DesviacionEstandarProps) => {
  return Math.sqrt(varianza);
};

export const obtenerCoeficienteVariacion = ({
  desviacion_estandar,
  promedio,
}: CoeficienteVariacionProps) => {
  return desviacion_estandar / promedio;
};
