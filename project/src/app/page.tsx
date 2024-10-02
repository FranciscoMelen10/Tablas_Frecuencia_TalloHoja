"use client";

// React
import { use, useEffect, useState } from "react";

// Shadcn Components
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

// Components
import NumberTable from "@/components/NumberTable";
import Distribucion_frecuencia from "../components/Distribucion_frecuencia";

// Utils
import ordenarLista from "@/utils";
import {
  obtenerRango,
  obtenerAmplitud,
  obtenerNumeroClases,
} from "../utils/distribucion_frecuencia";

// Types
import { numeroClase, Rango } from "@/types";
import { limites_clases, marca_clase } from "@/utils/limites_reales";
import TablaGeneral from "@/components/TablaGeneral";

export default function Home() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState<number[] | null>(null);
  const [listaOrdenada, setListaOrdenada] = useState<number[] | null>(null);
  const [error, setError] = useState<any>(null);
  const [rango, setRango] = useState<Rango | null>(null);
  const [numeroClases, setNumeroClases] = useState<numeroClase | null>(null);
  const [amplitud, setAmplitud] = useState<any>(null);

  const [limitesReales, setLimitesReales] = useState<any>(null);
  const [limitesClase, setLimitesClase] = useState<any>(null);
  const [marca, setMarca] = useState<any>(null);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
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
      setListaOrdenada(ordenarLista(json));
      setRango(obtenerRango(json));
      setNumeroClases(obtenerNumeroClases(json));
      setAmplitud(obtenerAmplitud(json));

      setError(null);
    } catch (err) {
      setError("Hubo un problema al procesar el archivo.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (rango && amplitud && numeroClases) {
      setLimitesReales(
        limites_clases({
          min: rango?.minimo,
          max: rango?.maximo,
          amplitud: Math.round(amplitud),
          isReal: true,
        })
      );
      setLimitesClase(
        limites_clases({
          min: rango?.minimo,
          max: rango?.maximo,
          amplitud: Math.round(amplitud),
          isReal: false,
        })
      );
      setMarca(
        marca_clase({
          min: rango?.minimo,
          amplitud: Math.round(amplitud),
          numero_clase: numeroClases?.clase,
        })
      );
    }
  }, [rango, amplitud, numeroClases]);

  return (
    <div className="flex items-center justify-center flex-col gap-10">
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
          <NumberTable numbers={data}>
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

      {limitesReales && limitesReales && marca && (
        <div className="flex flex-col justify-center gap-3 ">
          <h1 className="text-2xl text-center">Datos procesados ordenados:</h1>
          <TablaGeneral
            limites_clases={limitesClase}
            limites_reales={limitesReales}
            marca_clase={marca}
          />
        </div>
      )}
    </div>
  );
}
