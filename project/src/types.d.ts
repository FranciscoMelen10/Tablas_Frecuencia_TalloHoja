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

export interface LimitesClasesProps {
  min: number;
  max: number;
  amplitud: number;
  isReal: boolean;
}

export type intervalos = Array<{
  limite_inferior: number;
  limite_superior: number;
  contador: number;
}>;

export interface LimitesClases {
  limites: string[];
  intervalos: intervalos;
}

export interface MarcaClase {
  min: number;
  amplitud: number;
  numero_clase: number;
}

export interface TablaGeneralProps {
  lista: number[]; // lista de datos
  limites_reales: (string | number)[];
  limites_clases: (string | number)[];
  marca_clase: (string | number)[];
  f: intervalos;
}

export type TablaItemProps = {
  datos: (string | number)[];
  title: string;
  total: number;
};

export interface deltaProps {
  frecuencia_mayor: number;
  frecuencia_anterior: number;
  frecuencia_superior: number;
  indice: number;
}

export interface ModaProps {
  amplitud: number;
  delta1: number;
  delta2: number;
  limite_inferior: number;
}

export interface MedianaProps {
  amplitud: number;
  limite_inferior: number;
  n: number;
  frecuencia_acumulada_anterior: number;
  frecuencia: any;
}

export interface VarianzaProps {
  n: number;
  total_frecuencia_XiFi2: number;
}

export interface DesviacionEstandarProps {
  varianza: number;
}

export interface CoeficienteVariacionProps {
  desviacion_estandar: number;
  promedio: number;
}
