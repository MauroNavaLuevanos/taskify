/*App Redux Store*/

// Redux
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slicers/tasks';

export default configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
