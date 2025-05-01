import { useState } from 'react';
import { apiClient } from '../lib/api-client';
import { toast } from 'react-hot-toast';

interface ContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  savingJarId: string;
  savingJarName: string;
}

export const ContributionModal = ({ isOpen, onClose, savingJarId, savingJarName }: ContributionModalProps) => {
  const [value, setValue] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiClient.post('/contributions', {
        value: parseFloat(value),
        savingJarId,
      });
      toast.success('Depósito realizado com sucesso!');
      onClose();
    } catch (error) {
      toast.error('Erro ao realizar depósito');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-neutral-700 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-white font-handwritten">Depositar {savingJarName}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300"
            aria-label="Fechar modal"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="value" className="block text-white mb-2">
              Valor
            </label>
            <input
              type="number"
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-2 rounded bg-neutral-600 text-white"
              required
              min="0.01"
              step="0.01"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-white mb-2">
              Data
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 rounded bg-neutral-600 text-white"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Depositando...' : 'Depositar'}
          </button>
        </form>
      </div>
    </div>
  );
}; 