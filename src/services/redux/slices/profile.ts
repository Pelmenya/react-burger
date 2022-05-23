import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { profileAPI } from '../../../api/profile-api';
import { LoadingType } from '../../../utils/types/loading';
import { Nullable } from '../../../utils/types/nullable';

export interface UserType {
  email: string;
  name: string;
}

export interface ProfileStateType extends LoadingType {
  user: Nullable<UserType>;
  error?: string;
}

const initialProfileState = {
  user: null,
} as ProfileStateType;

export const getUser = createAsyncThunk(
  'profile/getUser',
  async (token: string) => {
    try {
      const response = await profileAPI.getUser(token);
      return response;
    } catch (err) {
      return Promise.reject(err);
    }
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialProfileState,
  reducers: {
		clearProfileError: (state) => {
			state.error = undefined;
		}
  },

	extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = 'pending';
			state.error = undefined;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = 'succeeded';
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message;
    });
  },
});

export const { clearProfileError } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
