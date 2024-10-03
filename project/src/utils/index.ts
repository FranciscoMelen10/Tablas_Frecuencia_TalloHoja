export default function ordenarLista(datos: number[]): number[] {
  return datos.sort((a, b) => a - b);
}


export function obtenerTalloHoja(datos:number[]) {
    // Paso 1: Ordenar los datos
    datos.sort((a, b) => a - b);

    // Paso 2: Separar los tallos y las hojas
    const tallosYHojas:any = {};
  
    datos.forEach(numero => {
      // Dividimos el número en tallo y hoja (ej. 56 -> tallo: 5, hoja: 6)
      const tallo = Math.floor(numero / 10); // Obtener los dígitos principales
      const hoja = numero % 10; // Obtener el dígito final
  
      // Si el tallo no existe en el diccionario, lo inicializamos
      if (!tallosYHojas[tallo]) {
        tallosYHojas[tallo] = [];
      }
  
      // Agregamos la hoja al tallo correspondiente
      tallosYHojas[tallo].push(hoja);
    });
  
    return tallosYHojas;
}
