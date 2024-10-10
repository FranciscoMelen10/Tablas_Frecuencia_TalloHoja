import { cp } from "fs";
import * as XLSX from "xlsx";

export async function POST(req) {
  try {
    // Leer el cuerpo de la solicitud
    const {
      limitesReales,
      limitesClase,
      marca,
      frecuenciaRelativa,
      frecuenciaAcumulada,
      frecuencia,
    } = await req.json(); // Aquí se obtienen los datos enviados por el frontend

    // Combinar los datos en un solo objeto para el Excel
    const datos = limitesReales.map((_, index) => ({
      "Limites de clases reales": limitesReales[index],
      "Limites de clases": limitesClase[index],
      "Marca de clases": marca[index],
      Frecuencia: frecuencia[index].contador,
      "Frecuencia Acumulada": frecuenciaAcumulada[index],
      "Frecuencia Relativa": frecuenciaRelativa[index].toFixed(2),
      "Frecuencia Porcentual": `${(frecuenciaRelativa[index] * 100).toFixed(
        2
      )}%`,
    }));

    // Crear el libro de trabajo (workbook) y la hoja (worksheet) a partir de los datos enviados
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Frecuencia");

    // Generar el archivo Excel en formato buffer (memoria)
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    // Configurar las cabeceras de la respuesta para descargar el archivo
    return new Response(excelBuffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=tabla_frecuencia.xlsx",
      },
    });
  } catch (error) {
    console.error("Error al generar el archivo Excel:", error);
    return new Response(
      JSON.stringify({ error: "Error al generar el archivo Excel" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
