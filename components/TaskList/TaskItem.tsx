'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Divider,
} from '@mui/material';
import {
  deleteTask,
  toggleArchiveTask,
  updateTask,
} from '@/redux/slices/taskSlice';
import TaskHeader from './TaskHeader';
import TaskActions from './TaskActions';
import TaskDetailsModal from './TaskDetailsModal';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  archived: boolean;
  day: string;
  time?: string;
}

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleCompleted = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    e.stopPropagation();
    dispatch(updateTask({
      ...task,
      completed: checked,
    }));
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    dispatch(deleteTask(task.id));
  };

  const handleArchive = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    dispatch(toggleArchiveTask(task.id));
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const updatedTitle = prompt('Update task title:', task.title);
    const updatedDescription = prompt('Update task description:', task.description);

    if (updatedTitle && updatedDescription) {
      dispatch(updateTask({
        ...task,
        title: updatedTitle,
        description: updatedDescription,
      }));
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 2,
          borderRadius: 1,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
          gap: 1,
          marginBottom: 2,
          cursor: 'pointer',
          '@media (min-width: 600px)': {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        }}
        onClick={toggleModal}
      >
        <TaskHeader task={task} onToggleCompleted={handleToggleCompleted} />
        <Typography variant="body2" sx={{ color: '#9e9e9e', marginBottom: 1 }}>
          {task.day} {task.time && `, ${task.time}`}
        </Typography>
        <Divider />
        <TaskActions
          isArchived={task.archived}
          onUpdate={handleUpdate}
          onArchive={handleArchive}
          onDelete={handleDelete}
        />
      </Box>
      <TaskDetailsModal
        open={isModalOpen}
        onClose={toggleModal}
        task={task}
      />
    </>
  );
};

export default TaskItem;
