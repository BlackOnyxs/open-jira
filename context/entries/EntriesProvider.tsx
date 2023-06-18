import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';

import { Entry } from '../../interfaces';
import entriesApi from '../../apis/entriesAppi';
import { useSnackbar } from 'notistack';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: []
}

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
    const { enqueueSnackbar } = useSnackbar();
    const addNewEntry = async(description: string) => {
        try {
            const { data } = await entriesApi.post<Entry>('/entries', {description})
            dispatch({ type: '[Entry] - Add-Entry', payload: data });
        } catch (error) {
            console.log(error)
            // TODO: handling errors
        }
    }

    const updateEntry = async ({_id, description, status}: Entry, showSnackbar = false) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {description, status} );
            console.log(data)
            dispatch({ type: '[Entry] - Entry-Updated', payload:  data });

            if ( showSnackbar ) {
                enqueueSnackbar( 'Entrada actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteEntry = async( id: string ) => {
        try {
            await entriesApi.delete(`/entries/${id}`); 
            dispatch({ type: '[Entry] - Delete-Entry', payload: id });
            enqueueSnackbar( 'Entrada eliminada', {
                variant: 'success',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type: '[Entry] - Refresh-Data', payload: data });
    }

    useEffect(() => {
        refreshEntries();
    }, []);


    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            updateEntry,
            deleteEntry,
        }}>
            {children}
        </EntriesContext.Provider>
    );
}