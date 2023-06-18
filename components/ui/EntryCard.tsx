import { FC, DragEvent, useContext } from 'react';
import { useRouter } from 'next/router';

import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';

import { UIContext } from '../../context/ui';
import { Entry } from '../../interfaces';
import { dateFunctions } from '../../utils';

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {

  const { toggleDragging } = useContext(UIContext);
  const { push } = useRouter();

  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('text', entry._id);
    toggleDragging(true);
  }

  const onClick = () => {
    console.log(entry._id)
    push(`/entries/${entry._id}`)
  }

  return (
    <Card
      onClick={ onClick }
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={() => toggleDragging(false)}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'>{dateFunctions.getFormatDistanceToNow( entry.createdAt )}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
