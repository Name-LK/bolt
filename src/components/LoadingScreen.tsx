import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-energy-primary mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Processando Documento</h2>
        <p className="text-gray-600">Aguarde enquanto analisamos suas informações...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;