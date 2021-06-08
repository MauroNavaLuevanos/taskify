import { createSlice } from '@reduxjs/toolkit';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    tasksTimeLabels: [
      {
        min: 0,
        max: 30,
        label: 'Short Task',
        color: 'success',
      },
      {
        min: 31,
        max: 45,
        label: 'Medium Task',
        color: 'warning',
      },
      {
        min: 46,
        label: 'Large Task',
        color: 'danger',
      },
    ],
  },
  reducers: {
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { deleteTask, setTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
