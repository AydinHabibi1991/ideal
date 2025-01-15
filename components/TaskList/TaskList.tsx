'use client';

import React from 'react';
import { Box } from '@mui/material';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Array<{
    id: number;
    title: string;
    description: string;
    completed: boolean;
    archived: boolean;
    day: string;
    time?: string;
  }>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: { xs: 1, md: 2 },
        width: '100%',
      }}
    >
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </Box>
  );
};

export default TaskList;
