'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import { connect } from 'react-redux';
import { addTask } from '@/redux/slices/taskSlice';
import { RootState } from '@/redux/store';
import { Task } from '@/types';

import DayTabs from './DayTabs';
import HeaderSection from './HeaderSection';
import FilterTabs from './FilterTabs';
import TaskCreationDialog from './TaskCreationDialog';

import TaskList from '../TaskList/TaskList';

interface TabsContainerProps {
  tasks: Task[];
  addTask: (task: Task) => void;
}

const TabsContainer: React.FC<TabsContainerProps> = ({ tasks, addTask }) => {
  const [activeMainTab, setActiveMainTab] = useState<'today' | 'tomorrow'>('today');
  const [activeFilterTab, setActiveFilterTab] = useState<number>(0);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [day, setDay] = useState<'today' | 'tomorrow'>('today');
  const [time, setTime] = useState<dayjs.Dayjs | null>(null);

  const handleMainTabChange = (
    event: React.SyntheticEvent,
    newValue: 'today' | 'tomorrow'
  ) => {
    setActiveMainTab(newValue);
  };

  const handleFilterTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveFilterTab(newValue);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTitle('');
    setDescription('');
    setDay('today');
    setTime(null);
  };

  const handleAddTask = () => {
    if (title && description && day && time) {
      addTask({
        title,
        description,
        day,
        time: dayjs(time).format('HH:mm'),
      });
      handleCloseDialog();
    } else {
      alert('All fields are required!');
    }
  };

  const calculateTaskCounts = () => {
    const all = tasks.length;
    const open = tasks.filter((task) => !task.completed && !task.archived).length;
    const closed = tasks.filter((task) => task.completed && !task.archived).length;
    const archived = tasks.filter((task) => task.archived).length;
    return { all, open, closed, archived };
  };

  const filterTasksByDay = (tasksList: Task[], selectedDay: 'today' | 'tomorrow') => {
    return tasksList.filter((task) => task.day === selectedDay);
  };

  const filterTasksByStatus = (
    tasksList: Task[],
    filter: 'all' | 'open' | 'closed' | 'archived'
  ) => {
    switch (filter) {
      case 'open':
        return tasksList.filter((t) => !t.completed && !t.archived);
      case 'closed':
        return tasksList.filter((t) => t.completed && !t.archived);
      case 'archived':
        return tasksList.filter((t) => t.archived);
      default:
        // 'all'
        return tasksList.filter((t) => !t.archived);
    }
  };

  const getFormattedDate = (selectedDay: 'today' | 'tomorrow') => {
    const date = selectedDay === 'today' ? dayjs() : dayjs().add(1, 'day');
    return date.format('dddd, MMMM D'); 
  };


  let filteredTasks = filterTasksByDay(tasks, activeMainTab);


  const filterKey = ['all', 'open', 'closed', 'archived'][activeFilterTab];
  filteredTasks = filterTasksByStatus(
    filteredTasks,
    filterKey as 'all' | 'open' | 'closed' | 'archived'
  );

  const { all, open, closed, archived } = calculateTaskCounts();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ padding: { xs: 1, md: 2 } }}>
        <DayTabs
          activeMainTab={activeMainTab}
          onChange={handleMainTabChange}
        />

        <HeaderSection
          activeMainTab={activeMainTab}
          getFormattedDate={getFormattedDate}
          onOpenDialog={handleOpenDialog}
        />

        <FilterTabs
          activeFilterTab={activeFilterTab}
          onChange={handleFilterTabChange}
          all={all}
          open={open}
          closed={closed}
          archived={archived}
        />

        <TaskList tasks={filteredTasks} />
      </Box>

      <TaskCreationDialog
        open={openDialog}
        title={title}
        description={description}
        day={day}
        time={time}
        onClose={handleCloseDialog}
        onAddTask={handleAddTask}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onDayChange={setDay}
        onTimeChange={setTime}
      />
    </LocalizationProvider>
  );
};

const mapStateToProps = (state: RootState) => ({
  tasks: state.tasks.tasks,
});

const mapDispatchToProps = {
  addTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TabsContainer);
