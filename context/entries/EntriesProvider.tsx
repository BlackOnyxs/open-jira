import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';

import { Entry } from '../../interfaces';
import { entiesAppi } from '../../apis';
import entriesApi from '../../apis/entriesAppi';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: []
}

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    const addNewEntry = async(description: string) => {
        try {
            const { data } = await entriesApi.post<Entry>('/entries', {description})
            dispatch({ type: '[Entry] - Add-Entry', payload: data });
        } catch (error) {
            console.log(error)
            // TODO: handling errors
        }
    }

    const updatedEntry = async ({_id, description, status}: Entry) => {
        try {
            const { data } = await entiesAppi.put<Entry>(`/entries/${_id}`, {description, status} )
            dispatch({ type: '[Entry] - Entry-Updated', payload:  data });
        } catch (error) {
            console.log(error)
        }
    }

    const refreshEntries = async () => {
        const { data } = await entiesAppi.get<Entry[]>('/entries');
        dispatch({ type: '[Entry] - Refresh-Data', payload: data });
    }

    useEffect(() => {
        refreshEntries();
    }, []);


    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            updatedEntry,
        }}>
            {children}
        </EntriesContext.Provider>
    );
}