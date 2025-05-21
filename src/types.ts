export interface FormData {
  municipality: string;
  contractNumber: string;
  file: File | null;
}

export interface FormErrors {
  municipality?: string;
  contractNumber?: string;
  file?: string;
  [key: string]: string | undefined;
}

export interface HistoricItem {
  mes: string;
  ano: string;
  consumption: number;
}

export interface ExtractedData {
  municipality: string;
  contractNumber: string;
  icms: {
    baseCalculo: string;
    percentual: string;
    valorImposto: string;
  };
  pis: {
    baseCalculo: string;
    percentual: string;
    valorImposto: string;
  };
  economiaPotencial: number;
  historic: HistoricItem[];
}