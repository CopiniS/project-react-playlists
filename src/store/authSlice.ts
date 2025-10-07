
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '../types';
import { saveUserSession, getUserSession, clearUserSession } from '../services/storage';

const STATIC_EMAIL = 'usuario@playlist.com';
const STATIC_PASSWORD = '123456';

const EMAIL_2 = 'usuario_2@playlist.com';
const PASSWORD_2 = '654321'

const storedUser = getUserSession();

const initialState: AuthState = {
  isAuthenticated: !!storedUser,
  user: storedUser
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const { email, password } = action.payload;
      
      if (email === STATIC_EMAIL && password === STATIC_PASSWORD) {
        const user: User = {
          id: '1',
          email,
          lastLogin: new Date().toISOString()
        };
        
        state.isAuthenticated = true;
        state.user = user;
        
        saveUserSession(user);
      }
      else if (email === EMAIL_2 && password === PASSWORD_2) {
        const user: User = {
          id: '2',
          email,
          lastLogin: new Date().toISOString()
        };
        
        state.isAuthenticated = true;
        state.user = user;
        
        saveUserSession(user);
      }
    },
    
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      clearUserSession();
    },
    
    updateLastPlaylist: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.lastPlaylistAccessed = action.payload;
        saveUserSession(state.user);
      }
    },
    
    restoreSession: (state) => {
      const session = getUserSession();
      if (session) {
        state.isAuthenticated = true;
        state.user = session;
      }
    }
  }
});

export const { login, logout, updateLastPlaylist, restoreSession } = authSlice.actions;
export default authSlice.reducer;