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
        },
        {
            _id: uuidv4(),
            description: 'in-progress: Culpa exercitation eiusmod reprehenderit consequat occaecat non ea.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            _id: uuidv4(),
            description: 'finished: Ad nulla voluptate exercitation ipsum nisi labore ut aliquip id.',
            status: 'finished',
            createdAt: Date.now() - 1000000,
        },
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

    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry
        }}>
            { children }
        </EntriesContext.Provider>
    );
}