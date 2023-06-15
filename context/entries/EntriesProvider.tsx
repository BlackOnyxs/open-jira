import { FC, PropsWithChildren, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { v4 as uuidv4 } from 'uuid';

import { Entry } from '../../interfaces';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'pending: Elit veniam enim mollit adipisicing officia anim fugiat non commodo officia ullamco est ipsum esse.',
            status: 'pending',
            createdAt: Date.now(),
        }
    ]
}

export const EntriesProvider:FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch ]= useReducer(entriesReducer, Entries_INITIAL_STATE);

    const addNewEntry = ( description: string) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description, 
            status: 'pending',
            createdAt: Date.now(),
        }

        dispatch({ type: '[Entry] - Add-Entry', payload: newEntry });
    }

    const updatedEntry = ( entry: Entry ) => {
        dispatch({type: '[Entry] - Entry-Updated', payload: entry});
    }

    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            updatedEntry,
        }}>
            { children }
        </EntriesContext.Provider>
    );
}