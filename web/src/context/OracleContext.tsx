import React, { createContext, useState, useContext, ReactNode } from 'react';
import { HymnResult, SourceSelectionState } from '../types';
import { HymnEmbeddings } from '../services/hymns';

interface OracleContextType {
  results: HymnResult[];
  setResults: React.Dispatch<React.SetStateAction<HymnResult[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  modelLoading: boolean;
  setModelLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  hymnEmbeddings: HymnEmbeddings | null;
  setHymnEmbeddings: React.Dispatch<React.SetStateAction<HymnEmbeddings | null>>;
  selectedSources: SourceSelectionState;
  setSelectedSources: React.Dispatch<React.SetStateAction<SourceSelectionState>>;
  isTyping: boolean;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  infoOpen: boolean;
  setInfoOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modelInitialized: boolean;
  setModelInitialized: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OracleContext = createContext<OracleContextType | undefined>(undefined);

export const OracleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [results, setResults] = useState<HymnResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hymnEmbeddings, setHymnEmbeddings] = useState<HymnEmbeddings | null>(null);
  const [selectedSources, setSelectedSources] = useState<SourceSelectionState>({
    orphic: true,
    homeric: false,  // This is displayed as "Gnostics" in the UI
    virgilian: false,
    biblical: false,
    custom: false,
    gnostic: false,
  });
  const [isTyping, setIsTyping] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [modelInitialized, setModelInitialized] = useState(false);

  const value = {
    results,
    setResults,
    isLoading,
    setIsLoading,
    modelLoading,
    setModelLoading,
    error,
    setError,
    hymnEmbeddings,
    setHymnEmbeddings,
    selectedSources,
    setSelectedSources,
    isTyping,
    setIsTyping,
    expanded,
    setExpanded,
    infoOpen,
    setInfoOpen,
    modelInitialized,
    setModelInitialized,
  };

  return <OracleContext.Provider value={value}>{children}</OracleContext.Provider>;
};

// Custom hook to use the Oracle context
export const useOracleContext = () => {
  const context = useContext(OracleContext);
  
  if (context === undefined) {
    throw new Error('useOracleContext must be used within an OracleProvider');
  }
  
  return context;
}; 