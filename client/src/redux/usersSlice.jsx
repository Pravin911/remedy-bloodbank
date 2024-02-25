import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users', // Add the name property
  initialState: {
    currentUser: null,
  },
  reducers: {
    SetCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const { SetCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;
