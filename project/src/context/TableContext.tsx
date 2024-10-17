"use client";
import { deltaProps, numeroClase, Rango } from "@/types";
import ordenarLista, { obtenerTalloHoja } from "@/utils";
import {
  obtenerAmplitud,
  obtenerNumeroClases,
  obtenerRango,
} from "@/utils/distribucion_frecuencia";
import {
  obtenerCoeficienteVariacion,
  obtenerDesviacionEstandar,
  obtenerFrecuenciaMayor,
  obtenerMediana,
  obtenerModa,
  obtenerVarianza,
} from "@/utils/medidas_dispersion";
import { limites_clases, marca_clase } from "@/utils/limites_reales";
import { createContext, use } from "react";
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

  // Frecuencia Xi * Fi
  const [frecuencia_XiFi, setFrecuencia_XiFi] = useState<any>(null);

  // Frecuencia Xi * Fi^2
  const [frecuencia_XiFi2, setFrecuencia_XiFi2] = useState<any>(null);

  // Total de frecuencia Xi * Fi^2
  const [total_frecuencia_XiFi2, setTotal_frecuencia_XiFi2] = useState<
    number | null
  >(null);

  /*  
    Logica de la medidas de dispersión y tendencia central
  */

  const [frecuenciaMayor, setFrecuenciaMayor] = useState<deltaProps | null>(
    null
  );

  // Promedio
  const [promedio, setPromedio] = useState<number | null>(null);

  // Indice de la tabla con mayor frecuencia
  const [delta, setDelta] = useState<number>(0);

  // delta1: Diferencia entre la frecuencia acumulada y el índice anterior
  const [delta1, setDelta1] = useState<number>(0);

  // delta2: Diferencia entre la frecuencia acumulada y el índice siguiente
  const [delta2, setDelta2] = useState<number>(0);

  // Indice de la tabla de frecuencia para el cálculo de la mediana
  const [indice, setIndice] = useState<number>(0);

  const [moda, setModa] = useState<number | null>(null);
  const [mediana, setMediana] = useState<number | null>(null);
  const [varianza, setVarianza] = useState<number | null>(null);
  const [desviacionEstandar, setDesviacionEstandar] = useState<number | null>(
    null
  );
  const [coeficienteVariacion, setCoeficienteVariacion] = useState<
    number | null
  >(null);

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

  useEffect(() => {
    if (frecuencia) {
      setFrecuenciaMayor(obtenerFrecuenciaMayor(frecuencia));
    }
  }, [frecuencia]);

  useEffect(() => {
    if (frecuenciaMayor) {
      setDelta(frecuenciaMayor.frecuencia_mayor);
      setDelta1(
        frecuenciaMayor.frecuencia_mayor - frecuenciaMayor.frecuencia_anterior
      );
      setDelta2(
        frecuenciaMayor.frecuencia_mayor - frecuenciaMayor.frecuencia_superior
      );
      setIndice(frecuenciaMayor.indice);
    }
  }, [frecuenciaMayor]);

  useEffect(() => {
    if (
      delta1 >= 0 &&
      delta2 >= 0 &&
      indice >= 0 &&
      amplitud &&
      total_frecuencia_XiFi2
    ) {
      setModa(
        obtenerModa({
          amplitud: amplitud,
          delta1,
          delta2,
          limite_inferior: frecuencia[indice].limite_inferior - 0.5,
        })
      );

      // Mediana
      setMediana(
        obtenerMediana({
          amplitud: amplitud,
          limite_inferior: frecuencia[indice].limite_inferior - 0.5,
          n: data.length,
          frecuencia_acumulada_anterior: frecuenciaAcumulada[indice - 1]
            ? frecuenciaAcumulada[indice - 1]
            : 0,
          frecuencia: frecuencia[indice].contador,
        })
      );

      // Varianza
      setVarianza(obtenerVarianza({ n: data.length, total_frecuencia_XiFi2 }));
    }
  }, [delta1, delta2, indice]);

  useEffect(() => {
    if (varianza && promedio) {
      // Desviación estándar
      setDesviacionEstandar(obtenerDesviacionEstandar({ varianza }));
    }
  }, [varianza]);

  useEffect(() => {
    if (desviacionEstandar && promedio) {
      // Coeficiente de variación
      setCoeficienteVariacion(
        obtenerCoeficienteVariacion({
          desviacion_estandar: desviacionEstandar,
          promedio,
        })
      );
    }
  }, [desviacionEstandar]);

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
        delta2,
        indice,
        moda,
        delta,
        mediana,
        varianza,
        desviacionEstandar,
        coeficienteVariacion,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
