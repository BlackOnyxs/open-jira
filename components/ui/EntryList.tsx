import { FC, useContext, useMemo } from 'react';
import { List, Paper } from '@mui/material'

import { EntryCard } from './';
import { EntriesStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries';

interface Props {
    status: EntriesStatus;
}

export const EntryList:FC<Props> = ({ status }) => {

    const { entries } = useContext( EntriesContext );

    const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status ), [entries]);

    return (
        <div>
            <Paper
                sx={{ 
                    height: 'calc(100vh - 180px)',
                    overflow: 'scroll', 
                    backgroundColor: 'transparent',
                    '&::-webkit-scrollbar': { display: 'none' },
                    padding: '3px 5px'
                }}
            >
                <List sx={{ opacity: 1 }}>
                    {
                        entriesByStatus.map( entry => (
                            <EntryCard  key={ entry._id } entry={ entry } />
                        ))
                    }
                </List>
            </Paper>
        </div>
    )
}
