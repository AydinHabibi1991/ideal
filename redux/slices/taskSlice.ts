import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  archived: boolean;
  day: string;
  time?: string;    
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'completed' | 'archived'>>) => {
      const newTask: Task = {
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        day: action.payload.day,    
        time: action.payload.time,  
        completed: false,
        archived: false,
      };
      state.tasks.push(newTask);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const updatedTask = action.payload;
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleArchiveTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.archived = !task.archived;
      }
    },
  },
});

export const { addTask, updateTask, deleteTask, toggleArchiveTask } = taskSlice.actions;

export default taskSlice.reducer;
