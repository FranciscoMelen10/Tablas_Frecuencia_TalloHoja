"use client";

// React
import { useEffect, useState } from "react";

// Shadcn Components
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

// Components
import NumberTable from "@/components/NumberTable";
import Distribucion_frecuencia from "../components/Distribucion_frecuencia";

import TablaGeneral from "@/components/TablaGeneral";
import TablaTalloHoja from "@/components/TablaTalloHoja";
import Image from "next/image";
import { useTable } from "@/hooks/useTable";

export default function Home() {
  const {
    data,
    rango,
    numeroClases,
    amplitud,
    talloHoja,
    limitesReales,
    limitesClase,
    marca,
    frecuencia,
    setData,
    listaOrdenada,
    frecuenciaAcumulada,
    frecuenciaRelativa,
    frecuencia_XiFi,
    frecuencia_XiFi2
  } = useTable();

  // Manejar el archivo
  const [file, setFile] = useState(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleGenerateExcel = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/createExcel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          limitesReales: limitesReales,
          limitesClase: limitesClase,
          marca: marca,
          frecuenciaAcumulada: frecuenciaAcumulada,
          frecuenciaRelativa: frecuenciaRelativa,
          frecuencia: frecuencia,
          frecuencia_XiFi:frecuencia_XiFi,
          frecuencia_XiFi2:frecuencia_XiFi2,
        }),
      });

      if (!res.ok) {
        throw new Error("Error al generar el archivo Excel");
      }

      // Obtener el archivo Excel como blob
      const blob = await res.blob();

      // Crear un enlace de descarga
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Tabla de frecuencia.xlsx";
      document.body.appendChild(link);
      link.click();

      // Limpiar después de la descarga
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Excel generado exitosamente",
        duration: 2000,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Hubo un error al generar el Excel",
        variant: "destructive",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("excelFile", file);

    try {
      const res = await fetch("/api/upload-excel", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        toast({
          title: "Error al subir el archivo",
          variant: "destructive",
          duration: 2000,
        });
        throw new Error("Error al subir el archivo");
      }

      const json = await res.json();

      if (!Array.isArray(json)) {
        toast({
          title: "El archivo no contiene un array de números",
          variant: "destructive",
          duration: 2000,
        });
        throw new Error("El archivo no contiene un array de números");
      }

      toast({
        title: "Excelente, mira los resultados",
        duration: 2000,
      });

      setData(json);
      setIsLoading(false);

      setError(null);
    } catch (err) {
      setError("Hubo un problema al procesar el archivo.");
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-20 h-20 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center flex-col gap-16">
        <div className="absolute top-0 left-0 flex items-center gap-5 p-3">
          <Image
            src="/Logo.jpg"
            width={80}
            height={80}
            alt="Logo"
            loading="lazy"
            className="rounded-full"
          />
          <h5 className="text-center text-xl">Creador: FranciscoMelen10</h5>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex h-screen items-center justify-center flex-col"
        >
          <div className="flex items-center justify-center flex-col border-[1px] border-white rounded-xl p-2 gap-3">
            <input
              className=""
              type="file"
              onChange={handleFileChange}
              accept=".xlsx, .xls"
            />
            <Button variant="default" className="rounded-xl" type="submit">
              Subir y procesar
            </Button>
          </div>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {data && (
          <div className="flex flex-col justify-center gap-3">
            <NumberTable>
              {rango && numeroClases && amplitud && (
                <Distribucion_frecuencia
                  maximo={rango.maximo}
                  minimo={rango.minimo}
                  resultado={rango.resultado}
                  total={numeroClases.clase}
                  amplitud={amplitud}
                />
              )}
            </NumberTable>
          </div>
        )}

        {talloHoja && (
          <div className="flex flex-col justify-center gap-3">
            <h1 className="text-2xl text-center">Tallo - Hoja</h1>
            <TablaTalloHoja datos={talloHoja} />
          </div>
        )}

        {limitesReales &&
          marca &&
          listaOrdenada &&
          frecuencia &&
          limitesClase && (
            <div className="flex flex-col justify-center gap-3 ">
              <TablaGeneral />
            </div>
          )}

        {data && (
          <Button
            variant="default"
            className="rounded-xl"
            onClick={handleGenerateExcel}
            disabled={loading}
          >
            {loading ? "Generando..." : "Generar Excel"}
          </Button>
        )}
      </div>
    );
  }
}
