import React from 'react';
import { Box, Button } from '@mui/material';

interface TaskActionsProps {
  isArchived: boolean;
  onUpdate: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onArchive: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const TaskActions: React.FC<TaskActionsProps> = ({ isArchived, onUpdate, onArchive, onDelete }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 1,
        marginTop: 1,
        '@media (min-width: 600px)': {
          marginTop: 0,
        },
      }}
    >
      <Button
        variant="outlined"
        size="small"
        onClick={onUpdate}
        sx={{
          textTransform: 'capitalize',
          fontSize: '12px',
        }}
      >
        Update
      </Button>
      <Button
        variant="text"
        size="small"
        onClick={onArchive}
        sx={{
          textTransform: 'capitalize',
          fontSize: '12px',
          color: isArchived ? '#ff5722' : '#1a73e8',
        }}
      >
        {isArchived ? 'Unarchive' : 'Archive'}
      </Button>
      <Button
        variant="text"
        size="small"
        color="error"
        onClick={onDelete}
        sx={{
          textTransform: 'capitalize',
          fontSize: '12px',
        }}
      >
        Delete
      </Button>
    </Box>
  );
};

export default TaskActions;
