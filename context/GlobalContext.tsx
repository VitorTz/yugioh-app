import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { ProfileInfo } from '@/helpers/types';

type GlobalState = {
  context: {
    session: Session | null
    user: User | null
    profileInfo: ProfileInfo | null
  }
  setContext: (newContext: any) => void;
};


const GlobalStateContext = createContext<GlobalState | undefined>(undefined);


export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
    const [context, setContext] = useState(
        {
            session: null, 
            user: null, 
            profileInfo: null            
        }
    );    

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