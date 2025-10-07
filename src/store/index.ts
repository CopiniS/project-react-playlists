
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import playlistReducer from './playlistSlice';
import musicReducer from './musicSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    playlists: playlistReducer,
    music: musicReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;