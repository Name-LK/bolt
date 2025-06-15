import React, { useState } from 'react';
import FormField from './FormField';
import FileUpload from './FileUpload';
import LoadingScreen from './LoadingScreen';
import ResultsScreen from './ResultsScreen';
import type { FormData, FormErrors, ExtractedData } from '../types';

interface ProgressData {
  progress: number;
  current_page?: number;
  total_pages?: number;
  status?: string;
}

const ClientForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    municipality: '',
    contractNumber: '',
    file: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [progressData, setProgressData] = useState<ProgressData>({
    progress: 0,
    status: "Iniciando processamento..."
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.municipality.trim()) {
      newErrors.municipality = 'Nome do município é obrigatório';
    }

    if (!formData.contractNumber.trim()) {
      newErrors.contractNumber = 'Número do contrato é obrigatório';
    }

    if (!formData.file) {
      newErrors.file = 'Por favor, carregue um arquivo PDF';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, file }));
    
    if (errors.file) {
      setErrors((prev) => ({ ...prev, file: undefined }));
    }
  };

  const pollProgress = async (taskId: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:8000/progress/${taskId}`);
      if (!response.ok) {
        throw new Error('Erro ao obter progresso');
      }

      const progress: ProgressData = await response.json();
      setProgressData(progress);

      // Continue polling if not complete
      if (progress.progress < 100) {
        setTimeout(() => pollProgress(taskId), 1000); // Poll every second
      }
    } catch (error) {
      console.error('Erro ao obter progresso:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    setIsSubmitting(true);
    setProgressData({ progress: 0, status: "Enviando arquivo..." });
  
    try {
      const payload = new FormData();
      payload.append("municipality", formData.municipality);
      payload.append("contractNumber", formData.contractNumber);
      payload.append("file", formData.file as Blob);
  
      // Send data to backend
      const response = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: payload,
      });
  
      if (!response.ok) {
        throw new Error("Erro ao enviar o formulário");
      }
  
      const result = await response.json();
      
      // Start polling for progress if task_id is returned
      if (result.task_id) {
        await pollProgress(result.task_id);
      }

      // Set final results
      setExtractedData({
        municipality: formData.municipality,
        contractNumber: formData.contractNumber,
        icms: result.extracted_icms_data?.icms || {
          baseCalculo: "0.00",
          percentual: "0.00",
          valorImposto: "0.00"
        },
        pis: {
          baseCalculo: "23.87",
          percentual: "1.11",
          valorImposto: "0.26"
        },
        economiaPotencial: result.economia_potencial || 8.66,
        valorCobrancaIndevida: result.valor_cobranca_indevida, // New field from backend
        historic: result.historic || []
      });
    } catch (error) {
      console.error("Erro ao enviar:", error);
      setProgressData({ progress: 0, status: "Erro no processamento" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setExtractedData(null);
    setProgressData({ progress: 0, status: "Iniciando processamento..." });
    setFormData({
      municipality: '',
      contractNumber: '',
      file: null,
    });
  };

  if (extractedData) {
    return <ResultsScreen data={extractedData} onBack={handleBack} />;
  }

  return (
    <>
      {isSubmitting && (
        <LoadingScreen 
          progress={progressData.progress}
          currentPage={progressData.current_page}
          totalPages={progressData.total_pages}
          status={progressData.status}
        />
      )}
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <FormField
          label="Nome do Município"
          name="municipality"
          value={formData.municipality}
          onChange={handleChange}
          placeholder="Ex: São Paulo"
          required
          error={errors.municipality}
        />

        <FormField
          label="Número do Contrato"
          name="contractNumber"
          value={formData.contractNumber}
          onChange={handleChange}
          placeholder="Ex: 2023-001"
          required
          error={errors.contractNumber}
        />

        <FileUpload
          onFileChange={handleFileChange}
          file={formData.file}
          error={errors.file}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 bg-energy-primary hover:bg-energy-secondary text-white font-medium rounded-md shadow-sm 
            transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processando...
            </span>
          ) : (
            'Iniciar Economia'
          )}
        </button>
      </form>
    </>
  );
};

export default ClientForm;