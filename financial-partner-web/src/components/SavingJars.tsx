import { useEffect, useState } from 'react';
import { useApiQuery } from '../hooks/use-query';
import { apiClient } from '../lib/api-client';
import { toast } from 'react-hot-toast';
import { FiPlus, FiList } from 'react-icons/fi';
import { ContributionModal } from './ContributionModal';
import { CreateSavingJarModal } from './CreateSavingJarModal';
import { ListContributionsModal } from './ListContributionsModal';

interface Jar {
  id: string;
  name: string;
  goal: number;
  saved: number;
}

export const SavingJars = () => {
  const [selectedJar, setSelectedJar] = useState<Jar | null>(null);
  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);

  const {
    data: jars,
    isLoading,
    error,
  } = useApiQuery<Jar[]>({
    queryKey: ['saving-jars'],
    queryFn: () => apiClient.get('/saving-jars').then(res => res.data),
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Erro ao carregar caixinhas');
    }
  }, [error]);

  const handlePlusClick = (jar: Jar) => {
    setSelectedJar(jar);
    setIsContributionModalOpen(true);
  };

  const handleListClick = (jar: Jar) => {
    setSelectedJar(jar);
    setIsListModalOpen(true);
  };

  const handleModalClose = () => {
    setIsContributionModalOpen(false);
    setSelectedJar(null);
  };

  const handleListModalClose = () => {
    setIsListModalOpen(false);
    setSelectedJar(null);
  };

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-800">
      <div className="w-full max-w-xs sm:max-w-sm bg-neutral-700 rounded-lg shadow-lg p-6 flex flex-col items-center">
        <h1 className="text-2xl mb-2 text-white text-center font-handwritten tracking-widest select-none">
          FINANCIAL PARTNER
        </h1>
        <h2 className="text-xl mb-4 text-white text-center font-handwritten tracking-widest select-none">
          CAIXINHAS
        </h2>
        <button 
          className="w-full mb-2 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-lg font-bold transition-colors"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Add Caixinha
        </button>
        <button className="w-full mb-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-lg font-bold transition-colors">
          Add Partner
        </button>
        <div className="w-full flex flex-col gap-3">
          {isLoading && <div className="text-white text-center">Carregando...</div>}
          {Array.isArray(jars) && jars.map((jar: Jar) => (
            <div key={jar.id} className="bg-white rounded-lg px-4 py-2 flex items-center justify-between shadow">
              <div className="font-handwritten text-black text-lg select-none">
                <div>{jar.name.toUpperCase()}</div>
                <div>META: {jar.goal}</div>
                <div>GUARDADO: {jar.saved}</div>
              </div>
              <div className="ml-2 flex gap-2">
                <button
                  className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center hover:bg-green-300 transition-colors"
                  onClick={() => handlePlusClick(jar)}
                  aria-label="Adicionar valor"
                  type="button"
                >
                  <FiPlus className="text-green-700" size={20} />
                </button>
                <button
                  className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center hover:bg-green-300 transition-colors"
                  onClick={() => handleListClick(jar)}
                  aria-label="Ver lista"
                  type="button"
                >
                  <FiList className="text-green-700" size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedJar && (
        <>
          <ContributionModal
            isOpen={isContributionModalOpen}
            onClose={handleModalClose}
            savingJarId={selectedJar.id}
            savingJarName={selectedJar.name}
          />
          <ListContributionsModal
            isOpen={isListModalOpen}
            onClose={handleListModalClose}
            savingJarId={selectedJar.id}
            savingJarName={selectedJar.name}
          />
        </>
      )}
      <CreateSavingJarModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
      />
      <style>{`
        .font-handwritten {
          font-family: 'Caveat', 'Comic Sans MS', cursive, sans-serif;
        }
      `}</style>
    </div>
  );
}; 