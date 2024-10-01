export interface Rango {
  minimo: number;
  maximo: number;
  resultado: number;
}

export interface numeroClase {
  total: number;
  clase: number;
}

export type Distribucion_frecuencia_Props = Rango &
  Omit<numeroClase, "clase"> & { amplitud: number };
