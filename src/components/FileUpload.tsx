import React, { useRef, useState } from 'react';
import { FileIcon, FileX, Upload } from 'lucide-react';

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  file: File | null;
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange, file, error }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile && selectedFile.type !== 'application/pdf') {
      alert('Por favor, selecione apenas arquivos PDF.');
      return;
    }
    onFileChange(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type !== 'application/pdf') {
      alert('Por favor, selecione apenas arquivos PDF.');
      return;
    }
    onFileChange(droppedFile || null);
  };

  const removeFile = () => {
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Documento de Consumo (PDF)
      </label>

      {!file ? (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 transition-all duration-200 cursor-pointer hover:bg-energy-accent/5 text-center ${
            isDragging
              ? 'border-energy-primary bg-energy-accent/5'
              : error
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300'
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            <Upload className="w-8 h-8 text-energy-primary mb-2" />
            <p className="text-sm text-gray-600 mb-1">
              Clique para selecionar ou arraste o arquivo PDF aqui
            </p>
            <p className="text-xs text-gray-500">Apenas arquivos PDF são aceitos</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-energy-accent/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-5 h-5 text-energy-primary mr-2" />
              <span className="text-sm text-gray-700 truncate max-w-[250px]">
                {file.name}
              </span>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="p-1 rounded-full hover:bg-red-100 transition-colors"
            >
              <FileX className="w-5 h-5 text-red-500" />
            </button>
          </div>
        </div>
      )}
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FileUpload