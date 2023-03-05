import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';

export const setLoggedIn = createAsyncThunk('User/setLoggedIn', async () => {
  // const result = await axiosInstance.get('/users/'); TODO: implement login funcs
  // return '';
});

const initialState = {
  loading: false,
  isLoggedIn: false,
  user: {}
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsersAction: (state, payload) => {
      console.log(state, payload);
    },
    setLoggedOut: (state, payload) => {
      state.isLoggedIn = false;
    }
  },
  extraReducers: {
    // logging in actions
    [setLoggedIn.pending]: (state) => {
      state.loading = true;
    },
    [setLoggedIn.fulfilled]: (state) => {
      state.loading = false;
    },
    [setLoggedIn.error]: (state, { error }) => {
      state.loading = false;
      console.log('User.setLoggedIn.error', error);
    }
  }
});

export const { getUsersAction, setLoggedOut } = userSlice.actions;

export default userSlice.reducer;
