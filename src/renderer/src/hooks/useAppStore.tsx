import React, { useState, useCallback, useContext, createContext, ReactNode } from 'react';
import { AppState } from '../../shared/types';

interface AppContextType {
  state: AppState;
  addData: (item: any) => void;
  removeData: (id: string) => void;
  updateData: (id: string, updates: Partial<any>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    data: [],
    loading: false,
    error: null,
  });

  const addData = useCallback((item: any) => {
    setState(prev => ({
      ...prev,
      data: [...prev.data, { ...item, id: Date.now().toString() }],
    }));
  }, []);

  const removeData = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      data: prev.data.filter(item => item.id !== id),
    }));
  }, []);

  const updateData = useCallback((id: string, updates: Partial<any>) => {
    setState(prev => ({
      ...prev,
      data: prev.data.map(item => 
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return (
    <AppContext.Provider value={{
      state,
      addData,
      removeData,
      updateData,
      setLoading,
      setError,
      clearError,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within AppProvider');
  }
  return context;
} 