import React from 'react';
import { Modal, Paper, Typography, Box, Button } from '@mui/material';

interface TaskDetailsModalProps {
  open: boolean;
  onClose: () => void;
  task: {
    title: string;
    description: string;
    day: string;
    time?: string;
  };
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ open, onClose, task }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          width: '90%',
          maxWidth: 400,
          margin: '10% auto',
          padding: 4,
          borderRadius: 2,
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Task Details
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>
          Title: {task.title}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Description: {task.description}
        </Typography>
        <Typography variant="body2" sx={{ color: '#9e9e9e', marginBottom: 1 }}>
          Day: {task.day}
        </Typography>
        <Typography variant="body2" sx={{ color: '#9e9e9e' }}>
          Time: {task.time || 'N/A'}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 2,
          }}
        >
          <Button variant="contained" color="primary" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default TaskDetailsModal;
