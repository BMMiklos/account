import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './slices/notification.slice';

export default configureStore({
  reducer: {
    notification: notificationReducer
  }
});
