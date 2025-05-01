import { useState } from 'react';
import { apiClient } from '../lib/api-client';
import { toast } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

interface CreateSavingJarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateSavingJarModal = ({ isOpen, onClose }: CreateSavingJarModalProps) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [goal, setGoal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiClient.post('/saving-jars', {
        name,
        date,
        goal: parseFloat(goal),
      });
      toast.success('Caixinha criada com sucesso!');
      await queryClient.invalidateQueries({ queryKey: ['saving-jars'] });
      onClose();
    } catch (error) {
      toast.error('Erro ao criar caixinha');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-neutral-700 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-white font-handwritten">Adicionar Caixinha</h2>
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
            <label htmlFor="name" className="block text-white mb-2">
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded bg-neutral-600 text-white"
              required
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
          <div>
            <label htmlFor="goal" className="block text-white mb-2">
              Meta
            </label>
            <input
              type="number"
              id="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full p-2 rounded bg-neutral-600 text-white"
              required
              min="0.01"
              step="0.01"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Criando...' : 'Criar'}
          </button>
        </form>
      </div>
    </div>
  );
}; 