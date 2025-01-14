'use client';

import React, { Component } from 'react';
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

interface TabsContainerState {
  activeMainTab: 'today' | 'tomorrow';
  activeFilterTab: number;
  openDialog: boolean;
  title: string;
  description: string;
  day: 'today' | 'tomorrow';
  time: dayjs.Dayjs | null;
}


class TabsContainer extends Component<TabsContainerProps, TabsContainerState> {
  state: TabsContainerState = {
    activeMainTab: 'today',
    activeFilterTab: 0,
    openDialog: false,
    title: '',
    description: '',
    day: 'today',
    time: null,
  };

  handleMainTabChange = (event: React.SyntheticEvent, newValue: 'today' | 'tomorrow') => {
    this.setState({ activeMainTab: newValue });
  };

  handleFilterTabChange = (event: React.SyntheticEvent, newValue: number) => {
    this.setState({ activeFilterTab: newValue });
  };

  handleOpenDialog = () => {
    this.setState({ openDialog: true });
  };

  handleCloseDialog = () => {
    this.setState({
      openDialog: false,
      title: '',
      description: '',
      day: 'today',
      time: null,
    });
  };

  handleAddTask = () => {
    const { title, description, day, time } = this.state;
    if (title && description && day && time) {
      this.props.addTask({
        title,
        description,
        day,
        time: dayjs(time).format('HH:mm'), 
      });
      this.handleCloseDialog();
    } else {
      alert('All fields are required!');
    }
  };


  calculateTaskCounts() {
    const { tasks } = this.props;
    const all = tasks.length;
    const open = tasks.filter((task) => !task.completed && !task.archived).length;
    const closed = tasks.filter((task) => task.completed && !task.archived).length;
    const archived = tasks.filter((task) => task.archived).length;
    return { all, open, closed, archived };
  }

  filterTasksByDay(tasks: Task[], day: 'today' | 'tomorrow') {
    return tasks.filter((task) => task.day === day);
  }

  filterTasksByStatus(tasks: Task[], filter: 'all' | 'open' | 'closed' | 'archived') {
    switch (filter) {
      case 'open':
        return tasks.filter((t) => !t.completed && !t.archived);
      case 'closed':
        return tasks.filter((t) => t.completed && !t.archived);
      case 'archived':
        return tasks.filter((t) => t.archived);
      case 'all':
      default:
        
        return tasks.filter((t) => !t.archived);
    }
  }

  getFormattedDate(day: 'today' | 'tomorrow') {
    const date = day === 'today' ? dayjs() : dayjs().add(1, 'day');
    return date.format('dddd, MMMM D'); // e.g., "Wednesday, May 11"
  }

  render() {
    const {
      activeMainTab,
      activeFilterTab,
      openDialog,
      title,
      description,
      day,
      time,
    } = this.state;
    const { tasks } = this.props;

    let filteredTasks = this.filterTasksByDay(tasks, activeMainTab);

    const filterKey = ['all', 'open', 'closed', 'archived'][activeFilterTab];
    filteredTasks = this.filterTasksByStatus(filteredTasks, filterKey as 'all' | 'open' | 'closed' | 'archived');

    const { all, open, closed, archived } = this.calculateTaskCounts();

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ padding: { xs: 1, md: 2 } }}>
          <DayTabs 
            activeMainTab={activeMainTab}
            onChange={this.handleMainTabChange}
          />

          <HeaderSection
            activeMainTab={activeMainTab}
            getFormattedDate={this.getFormattedDate.bind(this)}
            onOpenDialog={this.handleOpenDialog}
          />

          <FilterTabs
            activeFilterTab={activeFilterTab}
            onChange={this.handleFilterTabChange}
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
          onClose={this.handleCloseDialog}
          onAddTask={this.handleAddTask}
          onTitleChange={(val) => this.setState({ title: val })}
          onDescriptionChange={(val) => this.setState({ description: val })}
          onDayChange={(val) => this.setState({ day: val })}
          onTimeChange={(val) => this.setState({ time: val })}
        />
      </LocalizationProvider>
    );
  }
}


const mapStateToProps = (state: RootState) => ({
  tasks: state.tasks.tasks,
});

const mapDispatchToProps = {
  addTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TabsContainer);
