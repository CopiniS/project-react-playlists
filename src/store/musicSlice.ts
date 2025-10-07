
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { MusicState } from '../types';
import { searchMusicsByArtist, getTopMusics, searchMusicsByArtistAndTrack } from '../services/api';

const initialState: MusicState = {
  musicas: [],
  topMusicas: [],
  loading: false,
  error: null
};

export const fetchMusicsByArtist = createAsyncThunk(
  'music/fetchByArtist',
  async (artist: string) => {
    return await searchMusicsByArtist(artist);
  }
);

export const fetchMusicsByArtistAndTrack = createAsyncThunk(
  'music/fetchByArtistAndTrack',
  async (payload: {artist: string, track: string}) => {
    return await searchMusicsByArtistAndTrack(payload.artist, payload.track);
  }
);

export const fetchTopMusics = createAsyncThunk(
  'music/fetchTop',
  async () => {
    return await getTopMusics();
  }
);

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    clearMusics: (state) => {
      state.musicas = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMusicsByArtistAndTrack.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMusicsByArtistAndTrack.fulfilled, (state, action) => {
        state.loading = false;
        state.musicas = action.payload;
      })
      .addCase(fetchMusicsByArtistAndTrack.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar músicas';
      });

    builder
      .addCase(fetchMusicsByArtist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMusicsByArtist.fulfilled, (state, action) => {
        state.loading = false;
        state.musicas = action.payload;
      })
      .addCase(fetchMusicsByArtist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar músicas';
      });
    
    builder
      .addCase(fetchTopMusics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopMusics.fulfilled, (state, action) => {
        state.loading = false;
        state.topMusicas = action.payload;
      })
      .addCase(fetchTopMusics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar top músicas';
      });
  }
});

export const { clearMusics } = musicSlice.actions;
export default musicSlice.reducer;