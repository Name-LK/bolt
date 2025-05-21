import React from 'react';
import { Zap } from 'lucide-react';
import ClientForm from './ClientForm';

const FormContainer: React.FC = () => {
  return (
    <div className="min-h-screen bg-energy-background py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl">
          <div className="px-6 py-8 sm:p-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center p-3 bg-energy-accent/10 rounded-full mb-4">
                <Zap className="h-8 w-8 text-energy-primary" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Cadastro de Consumidor
              </h1>
              <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
                Preencha os dados do seu município e faça parte da revolução em economia de energia.
              </p>
            </div>
            
            <div className="flex justify-center">
              <ClientForm />
            </div>
          </div>
          
          <div className="px-6 py-4 bg-energy-background border-t border-gray-100 text-sm text-center text-gray-600">
            Seus dados são protegidos e utilizados para otimizar o consumo de energia.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormContainer