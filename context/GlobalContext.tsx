import React, { createContext, useState, useContext, ReactNode } from 'react';
import { GlobalState } from '@/helpers/types';


const GlobalStateContext = createContext<GlobalState | undefined>(undefined);


export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
    const [context, setContext] = useState(null);

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