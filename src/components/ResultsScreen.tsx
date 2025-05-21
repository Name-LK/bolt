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
          <h1 className="text-xl font-semibold">Resultado da Análise</h1>
          <button className="flex items-center hover:bg-energy-secondary/50 rounded-lg px-3 py-2 transition-colors">
            <Download className="w-5 h-5 mr-2" />
            Exportar
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-b-xl shadow-lg p-6">
          {/* Document Info */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Dados do Documento</h2>
            <p className="text-gray-600">
              Município: {data.municipality} | Contrato: {data.contractNumber}
            </p>
          </div>

          {/* Potential Savings */}
          <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Economia Total Potencial
            </h3>
            <p className="text-2xl font-bold text-green-700">
              R$ {data.economiaPotencial.toFixed(2)}
            </p>
          </div>

          {/* Tax Information */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* ICMS */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">ICMS</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Base de Cálculo</p>
                  <p className="text-xl font-semibold">R$ {data.icms.baseCalculo}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-gray-600">Valor do Imposto</p>
                  <p className="text-xl font-semibold text-blue-700">
                    R$ {data.icms.valorImposto}
                  </p>
                </div>
              </div>
            </div>

            {/* PIS */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">PIS</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Base de Cálculo</p>
                  <p className="text-xl font-semibold">R$ {data.pis.baseCalculo}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-gray-600">Valor do Imposto</p>
                  <p className="text-xl font-semibold text-blue-700">
                    R$ {data.pis.valorImposto}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-8">
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