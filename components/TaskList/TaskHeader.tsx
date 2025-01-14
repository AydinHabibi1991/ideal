import React from 'react';
import { Box, Typography, Checkbox } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface TaskHeaderProps {
  task: {
    title: string;
    description: string;
    completed: boolean;
  };
  onToggleCompleted: (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ task, onToggleCompleted }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            textDecoration: task.completed ? 'line-through' : 'none',
            fontSize: '16px',
            lineHeight: '20px',
          }}
        >
          {task.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: '14px',
            color: '#9e9e9e',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
            '@media (min-width: 600px)': {
              whiteSpace: 'normal',
            },
          }}
        >
          {task.description}
        </Typography>
      </Box>
      <Checkbox
        checked={task.completed}
        onChange={onToggleCompleted}
        onClick={(e) => e.stopPropagation()}
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        sx={{
          '&.Mui-checked': {
            color: '#1a73e8',
          },
        }}
      />
    </Box>
  );
};

export default TaskHeader;
