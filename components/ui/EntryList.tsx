import { DragEvent, FC, useContext, useMemo } from 'react';
import { List, Paper } from '@mui/material'

import { UIContext } from '../../context/ui';
import { EntriesContext } from '../../context/entries';

import { EntriesStatus } from '../../interfaces';
import { EntryCard } from './';

import styles from './EntryList.module.css'

interface Props {
    status: EntriesStatus;
}

export const EntryList:FC<Props> = ({ status }) => {

    const { entries, updatedEntry } = useContext( EntriesContext );
    const { isDragging, toggleDragging } = useContext( UIContext );

    const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status ), [entries]);

    const allowDrop = (event: DragEvent<HTMLDivElement> ) => {
        event.preventDefault();
    }

    const onDropEntry = (event: DragEvent ) => {
        const id = event.dataTransfer.getData('text');
        
        const entry = entries.find( e => e._id === id )!;
        entry.status = status;
        updatedEntry( entry );

        toggleDragging(false);
    }


    return (
        <div
            onDrop={ onDropEntry }
            onDragOver={ allowDrop }
            className={ isDragging ? styles.dragging : '' }
        >
            <Paper
                sx={{ 
                    height: 'calc(100vh - 180px)',
                    overflow: 'scroll', 
                    backgroundColor: 'transparent',
                    '&::-webkit-scrollbar': { display: 'none' },
                    padding: '3px 5px'
                }}
            >
                <List sx={{ opacity: isDragging ? 0.2 : 1, transition:'all .3s' }}>
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
