import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProfile } from '@/services/api/profile'; // Importe a sua função da API
import { ProfileResponse } from '@/types'; // Importe o tipo do seu perfil

interface ProfileContextType {
  profile: ProfileResponse | null;
  setProfile: (profile: ProfileResponse | null) => void;
  isLoading: boolean; // NOVO: Estado para controlar o carregamento inicial
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true); 

  // NOVO: useEffect para buscar o perfil quando o app carregar
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        
        const userProfile = await getProfile();
        setProfile(userProfile);
        console.log("Perfil carregado com sucesso!", userProfile);
      } catch (error) {
        // Se der erro (ex: perfil não existe ou token inválido), o perfil continua nulo.
        console.error("Nenhum perfil encontrado ou erro na autenticação:", error);
      } finally {
        // Independentemente do resultado, o carregamento inicial termina aqui.
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  return (
    <ProfileContext.Provider value={{ profile, setProfile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfileContext deve ser usado dentro de um ProfileProvider');
  }
  return context;
};
