import { ChangeEvent, useContext, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

import SaveOutineIcon from '@mui/icons-material/SaveOutlined';
import AddOutineIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {
  const { addNewEntry } = useContext( EntriesContext );
  const { isAddingEntry, setIsAddingEntry } = useContext( UIContext );
  
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);


  const onTextFiedChanged = ( event: ChangeEvent<HTMLInputElement>) => {
    setInputValue( event.target.value );
  }

  const onSave = () => {
    if ( inputValue.length === 0 ) return;
    addNewEntry( inputValue );
    setIsAddingEntry( false );
    setTouched(false)
    setInputValue('');
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>

      {
        isAddingEntry ? (
          <>
            <TextField
              fullWidth
              sx={{ marginTop: 2, marginBottom: 1 }}
              placeholder='Nueva entrada'
              autoFocus
              multiline
              label='Nueva entrarda'
              helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
              error={ inputValue.length <= 0 && touched }
              value={ inputValue }
              onChange={ onTextFiedChanged }
              onBlur={ () => setTouched( true ) }
            />
            <Box display='flex' justifyContent='space-between'>
              <Button
                variant='text'
                onClick={() => setIsAddingEntry( false )}
              >
                Cancelar
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                endIcon={<SaveOutineIcon />}
                onClick={ onSave }
              >
                Save
              </Button>
            </Box>
            
          </>
        ) 
        : (
          <Button
            startIcon={<AddOutineIcon />}
            fullWidth
            variant='outlined'
            onClick={() => setIsAddingEntry( true ) }
          >
            Agregar tarea
          </Button>
        )
      }


    </Box>
  )
}
