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
}

interface ResultsScreenProps {
  data: ExtractedData;
  onBack: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ data, onBack }) => {
  return (
    <div className="min-h-screen bg-energy-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
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
        <div className="bg-white rounded-b-xl shadow-lg p-6">
          {/* Document Info */}
          <div className="text-center text-sm text-gray-500 mb-8">
            {data.municipality} | Contrato: {data.contractNumber}
          </div>

          {/* Main Value */}
          <div className="text-center mb-12">
            <h2 className="text-xl text-gray-600 mb-4">Valor a ser recuperado</h2>
            <div className="bg-green-50 inline-block rounded-xl px-8 py-6">
              <p className="text-4xl font-bold text-green-700">
                R$ {data.economiaPotencial.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-12 max-w-lg mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Próximos Passos</h3>
            <ol className="space-y-3">
              <li className="flex items-center text-gray-700">
                <span className="bg-energy-primary/10 text-energy-primary w-6 h-6 rounded-full flex items-center justify-center mr-3">
                  1
                </span>
                Consulte um especialista para avaliar suas possibilidades de economia.
              </li>
              <li className="flex items-center text-gray-700">
                <span className="bg-energy-primary/10 text-energy-primary w-6 h-6 rounded-full flex items-center justify-center mr-3">
                  2
                </span>
                Verifique a possibilidade de compensação de impostos já pagos.
              </li>
              <li className="flex items-center text-gray-700">
                <span className="bg-energy-primary/10 text-energy-primary w-6 h-6 rounded-full flex items-center justify-center mr-3">
                  3
                </span>
                Considere alternativas para redução do consumo energético.
              </li>
            </ol>
          </div>

          <p className="text-sm text-gray-500 mt-8 text-center">
            Estas informações foram extraídas automaticamente e podem requerer verificação adicional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;