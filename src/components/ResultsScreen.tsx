import React from 'react';
import { ArrowLeft, Download } from 'lucide-react';

interface ExtractedData {
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
  valorCobrancaIndevida?: number; // New field from backend
}

interface ResultsScreenProps {
  data: ExtractedData;
  onBack: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ data, onBack }) => {
  return (
    <div className="min-h-screen bg-energy-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-energy-primary text-white p-4 rounded-t-xl flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center hover:bg-energy-secondary/50 rounded-lg px-3 py-2 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </button>
          <button className="flex items-center hover:bg-energy-secondary/50 rounded-lg px-3 py-2 transition-colors">
            <Download className="w-5 h-5 mr-2" />
            Exportar
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-b-xl shadow-lg p-8">
          {/* Document Info - More discrete */}
          <div className="text-center text-xs text-gray-400 mb-12 border-b border-gray-100 pb-4">
            {data.municipality} • Contrato: {data.contractNumber}
          </div>

          {/* Main Value - Valor de Cobrança Indevida */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">
              Valor de Cobrança Indevida
            </h2>
            <div className="bg-gradient-to-br from-red-50 to-red-100 inline-block rounded-2xl px-12 py-10 shadow-sm border border-red-200">
              <p className="text-5xl font-bold text-red-700 mb-2">
                R$ {(data.valorCobrancaIndevida || data.economiaPotencial || 0).toFixed(2)}
              </p>
              <p className="text-sm text-red-600 font-medium">
                Valor identificado para recuperação
              </p>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-500 bg-gray-50 rounded-lg p-4">
              Este valor foi calculado automaticamente com base na análise do seu documento. 
              Recomendamos consultar um especialista para validação.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;