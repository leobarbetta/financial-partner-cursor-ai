import { useEffect, useState } from 'react';
import { useApiQuery } from '../hooks/use-query';
import { useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/api-client';
import { toast } from 'react-hot-toast';
import { FiX } from 'react-icons/fi';
import { ContributionModal } from './ContributionModal';

interface Contribution {
  id: string;
  value: number;
  date: string;
  partner: {
    name: string;
  };
}

interface ListContributionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savingJarId: string;
  savingJarName: string;
}

export const ListContributionsModal = ({
  isOpen,
  onClose,
  savingJarId,
  savingJarName,
}: ListContributionsModalProps) => {
  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: contributions,
    isLoading,
    error,
  } = useApiQuery<Contribution[]>({
    queryKey: ['contributions', savingJarId],
    queryFn: () => apiClient.get(`/contributions/saving-jar/${savingJarId}`).then(res => res.data),
    enabled: isOpen,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Erro ao carregar contribuições');
    }
  }, [error]);

  const handleContributionModalClose = () => {
    setIsContributionModalOpen(false);
    // Invalidate the contributions query to refetch the list
    queryClient.invalidateQueries({ queryKey: ['contributions', savingJarId] });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-neutral-700 rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-white font-handwritten">
            Histórico {savingJarName}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300"
            aria-label="Fechar"
          >
            <FiX size={24} />
          </button>
        </div>

        <button
          className="w-full mb-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-lg font-bold transition-colors"
          onClick={() => setIsContributionModalOpen(true)}
        >
          Adicionar Contribuição
        </button>

        <div className="space-y-3">
          {isLoading && <div className="text-white text-center">Carregando...</div>}
          {Array.isArray(contributions) && contributions.map((contribution) => (
            <div
              key={contribution.id}
              className="bg-white rounded-lg px-4 py-3 shadow"
            >
              <div className="font-handwritten text-black">
                <div className="text-lg">R$ {contribution.value}</div>
                <div className="text-sm">Data: {new Date(contribution.date).toLocaleDateString()}</div>
                <div className="text-sm">Parceiro: {contribution.partnerId}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ContributionModal
        isOpen={isContributionModalOpen}
        onClose={handleContributionModalClose}
        savingJarId={savingJarId}
        savingJarName={savingJarName}
      />
    </div>
  );
}; 