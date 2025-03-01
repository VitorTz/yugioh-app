import React, { createContext, useState, useContext, ReactNode } from 'react';
import { GlobalContext, GlobalState } from '@/helpers/types';


const GlobalStateContext = createContext<GlobalState | undefined>(undefined);


export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
    const [context, setContext] = useState<GlobalContext | null | undefined>(null);

    return (
        <GlobalStateContext.Provider value={{ context, setContext }}>
        {children}
        </GlobalStateContext.Provider>
    );
    };
  
export const useGlobalState = (): GlobalState => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error('useGlobalState deve ser utilizado dentro de um GlobalStateProvider');
    }
    return context;
};