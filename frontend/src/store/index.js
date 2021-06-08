/*App Redux Store*/

// Redux
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import tasksReducer from './slicers/tasks';
import authReducer from './slicers/auth';

export default configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
  },
});
