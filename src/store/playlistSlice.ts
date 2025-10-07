
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Playlist, PlaylistState, Music } from '../types';
import { getPlaylistsFromStorage, savePlaylistsToStorage } from '../services/storage';

const initialState: PlaylistState = {
  playlists: getPlaylistsFromStorage(), 
  loading: false,
  error: null
};

const playlistSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    createPlaylist: (state, action: PayloadAction<{ nome: string; usuarioId: string }>) => {
      const newPlaylist: Playlist = {
        id: Date.now().toString(),
        nome: action.payload.nome,
        usuarioId: action.payload.usuarioId,
        musicas: [],
        createdAt: new Date().toISOString()
      };
      
      state.playlists.push(newPlaylist);
      savePlaylistsToStorage(state.playlists);
    },
    
    updatePlaylist: (state, action: PayloadAction<Playlist>) => {
      const index = state.playlists.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.playlists[index] = action.payload;
        savePlaylistsToStorage(state.playlists);
      }
    },
    
    deletePlaylist: (state, action: PayloadAction<string>) => {
      state.playlists = state.playlists.filter(p => p.id !== action.payload);
      savePlaylistsToStorage(state.playlists);
    },
    
    addMusicToPlaylist: (state, action: PayloadAction<{ playlistId: string; music: Music }>) => {
      const playlist = state.playlists.find(p => p.id === action.payload.playlistId);
      if (playlist) {
        const musicExists = playlist.musicas.some(m => m.id === action.payload.music.id);
        if (!musicExists) {
          playlist.musicas.push(action.payload.music);
          savePlaylistsToStorage(state.playlists);
        }
      }
    },
    
    removeMusicFromPlaylist: (state, action: PayloadAction<{ playlistId: string; musicId: string }>) => {
      const playlist = state.playlists.find(p => p.id === action.payload.playlistId);
      if (playlist) {
        playlist.musicas = playlist.musicas.filter(m => m.id !== action.payload.musicId);
        savePlaylistsToStorage(state.playlists);
      }
    },
    
    loadPlaylists: (state) => {
      state.playlists = getPlaylistsFromStorage();
    }
  }
});

export const {
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  addMusicToPlaylist,
  removeMusicFromPlaylist,
  loadPlaylists
} = playlistSlice.actions;

export default playlistSlice.reducer;