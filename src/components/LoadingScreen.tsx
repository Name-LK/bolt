import React from 'react';

interface LoadingScreenProps {
  progress: number;
  currentPage?: number;
  totalPages?: number;
  status?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  progress, 
  currentPage, 
  totalPages, 
  status = "Processando documento..." 
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center max-w-md w-full mx-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-energy-primary mb-6"></div>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Processando Documento</h2>
        <p className="text-gray-600 mb-6 text-center">{status}</p>
        
        {/* Progress Bar */}
        <div className="w-full mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progresso</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-energy-primary h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Page Counter */}
        {currentPage && totalPages && (
          <div className="text-sm text-gray-500">
            Página {currentPage} de {totalPages}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;