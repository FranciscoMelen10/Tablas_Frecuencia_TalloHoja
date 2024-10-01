export default function ordenarLista(datos: number[]): number[] {
  console.log("Ordenando lista");
  console.log(datos);
  return datos.sort((a, b) => a - b);
}
