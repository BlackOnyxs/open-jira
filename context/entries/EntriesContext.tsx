import { createContext } from 'react';
import { Entry } from '../../interfaces';


interface ContextProps {
    entries: Entry[];

    addNewEntry: (descipption: string) => void;
}


export const EntriesContext = createContext({} as ContextProps);