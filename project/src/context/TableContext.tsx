"use client";
import { numeroClase, Rango } from "@/types";
import ordenarLista, { obtenerTalloHoja } from "@/utils";
import {
  obtenerAmplitud,
  obtenerNumeroClases,
  obtenerRango,
} from "@/utils/distribucion_frecuencia";
import { limites_clases, marca_clase } from "@/utils/limites_reales";
import { createContext } from "react";
import { useEffect, useState } from "react";

export const TableContext = createContext<any>(null);

export const TableProvider = ({ children }: any) => {
  const [data, setData] = useState<any>(null);

  // Datos de la distribución de frecuencia
  const [listaOrdenada, setListaOrdenada] = useState<number[] | null>(null);
  const [rango, setRango] = useState<Rango | null>(null);
  const [numeroClases, setNumeroClases] = useState<numeroClase | null>(null);
  const [amplitud, setAmplitud] = useState<number | null>(null);

  // Datos de la tabla general
  const [limitesReales, setLimitesReales] = useState<any>(null);
  const [limitesClase, setLimitesClase] = useState<any>(null);
  const [marca, setMarca] = useState<any>(null);

  // Datos de la tabla de tallo y hoja
  const [talloHoja, setTalloHoja] = useState<any>(null);

  // frecuencia
  const [frecuencia, setFrecuencia] = useState<any>(null);
  const [frecuenciaAcumulada, setFrecuenciaAcumulada] = useState<any>(null);
  const [frecuenciaRelativa, setFrecuenciaRelativa] = useState<any>(null);

  const [frecuencia_XiFi, setFrecuencia_XiFi] = useState<any>(null);
  const [frecuencia_XiFi2, setFrecuencia_XiFi2] = useState<any>(null);
  const [total_frecuencia_XiFi2, setTotal_frecuencia_XiFi2] = useState<
    number | null
  >(null);

  const [promedio, setPromedio] = useState<number | null>(null);
  const [delta1, setDelta1] = useState<number | null>(null);
  const [delta2, setDelta2] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      setListaOrdenada(ordenarLista(data));
      setRango(obtenerRango(data));
      setNumeroClases(obtenerNumeroClases(data));
      setAmplitud(obtenerAmplitud(data));
    } else {
      setListaOrdenada(null);
      setRango(null);
      setNumeroClases(null);
      setAmplitud(null);
    }
  }, [data]);

  useEffect(() => {
    if (rango && amplitud && numeroClases) {
      setLimitesReales(
        limites_clases({
          min: rango?.minimo,
          max: rango?.maximo,
          amplitud: Math.round(amplitud),
          isReal: true,
        }).limites
      );
      setLimitesClase(
        limites_clases({
          min: rango?.minimo,
          max: rango?.maximo,
          amplitud: Math.round(amplitud),
          isReal: false,
        }).limites
      );
      setMarca(
        marca_clase({
          min: rango?.minimo,
          amplitud: Math.round(amplitud),
          numero_clase: numeroClases?.clase,
        })
      );

      setFrecuencia(
        limites_clases({
          min: rango?.minimo,
          max: rango?.maximo,
          amplitud: Math.round(amplitud),
          isReal: false,
        }).intervalos
      );
    }
  }, [rango, amplitud, numeroClases]);

  useEffect(() => {
    if (listaOrdenada) {
      setTalloHoja(obtenerTalloHoja(listaOrdenada));
    }
  }, [listaOrdenada]);

  // Funciones para actualizar frecuencias
  const obtenerFrecuencias = (data: any) => setFrecuenciaAcumulada(data);
  const obtenerFrecuenciaRelativa = (data: any) => setFrecuenciaRelativa(data);
  const obtenerFrecuenciaXiFi = (data: any) => setFrecuencia_XiFi(data);
  const obtenerFrecuenciaXiFi2 = (data: any) => setFrecuencia_XiFi2(data);

  return (
    <TableContext.Provider
      value={{
        data,
        setData,
        rango,
        amplitud,
        numeroClases,
        talloHoja,
        limitesClase,
        limitesReales,
        frecuencia,
        marca,
        listaOrdenada,
        frecuenciaAcumulada,
        obtenerFrecuencias,
        obtenerFrecuenciaRelativa,
        frecuenciaRelativa,
        obtenerFrecuenciaXiFi,
        obtenerFrecuenciaXiFi2,
        setTotal_frecuencia_XiFi2,
        frecuencia_XiFi,
        frecuencia_XiFi2,
        total_frecuencia_XiFi2,
        promedio,
        setPromedio,
        delta1,
        setDelta1,
        delta2,
        setDelta2,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
