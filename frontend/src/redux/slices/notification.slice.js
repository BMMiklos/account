import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: "",
    type: ""
  },
  reducers: {
    openNotification: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    closeNotification: (state, action) => {
      state.message = "";
      state.type = "";
    }
  }
});

export const { openNotification, closeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
