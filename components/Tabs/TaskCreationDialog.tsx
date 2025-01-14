import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

interface TaskCreationDialogProps {
  open: boolean;
  title: string;
  description: string;
  day: 'today' | 'tomorrow';
  time: dayjs.Dayjs | null;
  onClose: () => void;
  onAddTask: () => void;
  onTitleChange: (val: string) => void;
  onDescriptionChange: (val: string) => void;
  onDayChange: (val: 'today' | 'tomorrow') => void;
  onTimeChange: (val: dayjs.Dayjs | null) => void;
}

const TaskCreationDialog: React.FC<TaskCreationDialogProps> = ({
  open,
  title,
  description,
  day,
  time,
  onClose,
  onAddTask,
  onTitleChange,
  onDescriptionChange,
  onDayChange,
  onTimeChange,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Create New Task</DialogTitle>
      <DialogContent>
        <TextField
          label="Task Title"
          fullWidth
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onTitleChange(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Task Description"
          fullWidth
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onDescriptionChange(e.target.value)}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="day-select-label">Day</InputLabel>
          <Select
            labelId="day-select-label"
            value={day}
            label="Day"
            onChange={(e: SelectChangeEvent<'today' | 'tomorrow'>) => onDayChange(e.target.value as 'today' | 'tomorrow')}
          >
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="tomorrow">Tomorrow</MenuItem>
          </Select>
        </FormControl>
        <TimePicker
          label="Select Time"
          value={time}
          onChange={(newTime: dayjs.Dayjs | null) => onTimeChange(newTime)}
          slotProps={{
            textField: {
              fullWidth: true,
              margin: "normal"
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onAddTask} variant="contained">
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskCreationDialog;
