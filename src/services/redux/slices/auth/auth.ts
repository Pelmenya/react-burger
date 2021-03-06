import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authAPI, UserData } from '../../../../api/auth-api';
import { LoadingType } from '../../../../utils/types/loading';

export interface AuthStateType extends LoadingType {
  error?: string;
}

export const initialAuthState = {} as AuthStateType;

export const postRegister = createAsyncThunk(
  'auth/postRegister',
  async (userData: UserData) => await authAPI.postRegiter(userData),
);

export const postLogin = createAsyncThunk(
  'auth/postLogin',
  async (userData: Omit<UserData, 'name'>) => await authAPI.postLogin(userData),
);

export const postToken = createAsyncThunk(
  'auth/postToken',
  async (token: string | null) => await authAPI.postToken({ token: token }),
);

export const postLogout = createAsyncThunk(
  'auth/postLogout',
  async (token: string | null) => await authAPI.postLogout({ token: token }),
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    clearAuthError: (state) => {
      state.error = undefined;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(postRegister.pending, (state) => {
      state.loading = 'pending';
      state.error = undefined;
    });
    builder.addCase(postRegister.fulfilled, (state, action) => {
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      localStorage.setItem('accessToken', action.payload.accessToken);
      state.loading = 'succeeded';
    });
    builder.addCase(postRegister.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message;
    });

    builder.addCase(postLogin.pending, (state) => {
      state.loading = 'pending';
      state.error = undefined;
    });
    builder.addCase(postLogin.fulfilled, (state, action) => {
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      localStorage.setItem('accessToken', action.payload.accessToken);
      state.loading = 'succeeded';
    });
    builder.addCase(postLogin.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message;
    });

    builder.addCase(postToken.pending, (state) => {
      state.loading = 'pending';
      state.error = undefined;
    });
    builder.addCase(postToken.fulfilled, (state, action) => {
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      localStorage.setItem('accessToken', action.payload.accessToken);
      state.loading = 'succeeded';
    });
    builder.addCase(postToken.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message;
    });

    builder.addCase(postLogout.pending, (state) => {
      state.loading = 'pending';
      state.error = undefined;
    });
    builder.addCase(postLogout.fulfilled, (state, action) => {
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
      state.loading = 'succeeded';
    });
    builder.addCase(postLogout.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message;
    });
  },
});

export const { clearAuthError } = authSlice.actions;
export const authReducer = authSlice.reducer;
