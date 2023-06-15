import { Entry } from '../../interfaces';
import { EntriesState } from './';

type EntriesType = 
| { type: '[Entry] - Add-Entry', payload: Entry }

export const entriesReducer = ( state: EntriesState, action: EntriesType): EntriesState => {
    switch (action.type) {
        case '[Entry] - Add-Entry':
            return {
                ...state,
                entries: [...state.entries, action.payload ]
            }

        default:
            return state;
    }
}