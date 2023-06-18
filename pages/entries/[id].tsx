import { ChangeEvent, FC, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';

import { capitalize, Grid, CardHeader, Card, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, IconButton } from '@mui/material';

import SaveOutlineIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';

import { dbEntries } from '../../database';
import { Layout } from '../../components/layouts';
import { EntriesStatus, Entry } from '../../interfaces';
import { EntriesContext } from '../../context/entries';
import { dateFunctions } from '../../utils';

const validStatus: EntriesStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
  entry: Entry;
}


export const EntryPage: FC<Props> = ({ entry }) => {

  const { updateEntry, deleteEntry } = useContext( EntriesContext );

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntriesStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

  const onTextFiedChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
    setInputValue( event.target.value );
  }

  const onStatusChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    const newStatus = validStatus.find( s => s === event.target.value )
    setStatus( newStatus! );
  }

  const onSave = () => {
    if ( inputValue.trim().length === 0 ) return;
    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    }
    updateEntry( updatedEntry, true );
  }

  const onDelete = () => {
    deleteEntry( entry._id );
  }


  return (
    <Layout title={inputValue.substring(0,20) + '...'}>
      <Grid 
        container
        justifyContent='center'
        sx={{ marginTop: 2 }}
      >
        <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
          <Card>
            <CardHeader 
              title={'Entrada:'}
              subheader={`Creada ${dateFunctions.getFormatDistanceToNow( entry.createdAt )}`}
            />
            <CardContent>
                <TextField 
                  sx={{ marginTop: 2, marginBottom: 1 }}
                  fullWidth
                  placeholder='Nueva Entrada'
                  autoFocus
                  multiline
                  label="Nueva Entara"
                  value={ inputValue }
                  onChange={ onTextFiedChanged }
                  helperText={ isNotValid && 'Ingrese un valor'}
                  onBlur={() => setTouched( true ) }
                  error={ isNotValid }
                />

                <FormControl>
                  <FormLabel>Estado:</FormLabel>
                  <RadioGroup
                    row
                    value={ status }
                    onChange={ onStatusChange  }
                  >
                    {
                      validStatus.map( option => (
                        <FormControlLabel 
                          key={ option }
                          value={ option }
                          control={ <Radio /> }
                          label={ capitalize(option) }
                        />
                      ))
                    }
                  </RadioGroup>
                </FormControl>

            </CardContent>
            <CardActions>
              <Button
                startIcon={ <SaveOutlineIcon /> }
                variant='contained'
                fullWidth
                onClick={ onSave }
                disabled={ inputValue.length <= 0 }
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <IconButton 
          sx={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            backgroundColor: 'error.dark'
          }}
          onClick={ onDelete }
        >
          <DeleteOutlineIcon />
        </IconButton>
      </Grid>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  
  const { id } = params as { id: string};

  const entry = await dbEntries.getEntryById(id);

  if ( !entry ) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      entry
    }
  }
}

export default EntryPage;
