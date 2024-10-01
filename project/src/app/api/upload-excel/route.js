import * as XLSX from "xlsx";

export async function POST(req) {
  try {
    const formData = await req.formData(); // Capturamos el formData nativo
    const file = formData.get('excelFile'); // Obtenemos el archivo por el campo de nombre 'excelFile'

    // Leer el archivo Excel como buffer
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(new Uint8Array(buffer), { type: "array" });

    const sheet_name_list = workbook.SheetNames; // Obtener nombres de hojas
    const sheet = workbook.Sheets[sheet_name_list[0]]; // Obtener la primera hoja

    // Convertir la hoja completa en un arreglo, incluyendo celdas vacías
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // header: 1 devuelve todas las filas como un arreglo de arreglos

    // Transformar los datos en un solo arreglo de enteros
    const transformedData = data.flatMap(row => row.filter(value => Number.isInteger(value)));

    // Retornar los datos transformados
    return new Response(JSON.stringify(transformedData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error al procesar el archivo" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
