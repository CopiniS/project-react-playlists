
import axios from 'axios';
import type { AudioDBTrack, Music } from '../types';

const API_BASE_URL = 'https://www.theaudiodb.com/api/v1/json/2';

const convertTrackToMusic = (track: AudioDBTrack): Music => ({
  id: track.idTrack,
  nome: track.strTrack,
  artista: track.strArtist,
  genero: track.strGenre || 'Desconhecido',
  ano: track.intYearReleased || 'N/A',
  thumb: track.strTrackThumb || undefined
});

export const searchMusicsByArtist = async (artist: string): Promise<Music[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/track-top10.php?s=${artist}`);
    const tracks = response.data?.track || [];
    return tracks.map(convertTrackToMusic);
  } catch (error) {
    console.error('Erro ao buscar músicas:', error);
    return [];
  }
};

export const searchMusicsByArtistAndTrack = async (artist: string, trackName: string): Promise<Music[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/searchtrack.php?s=${artist}&t=${trackName}`);
    console.log('response: ', response)
    const tracks = response.data?.track || [];
    return tracks.map(convertTrackToMusic);
  } catch (error) {
    console.error('Erro ao buscar músicas:', error);
    return [];
  }
};

export const searchArtist = async (artist: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search.php?s=${encodeURIComponent(artist)}`);
    return response.data?.artists || [];
  } catch (error) {
    console.error('Erro ao buscar artista:', error);
    return [];
  }
};

export const getTopMusics = async (): Promise<Music[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/trending.php?country=us&type=itunes&format=singles`);
    console.log('response top: ', response)
    const tracks = response.data?.trending || [];
    console.log('tracks: ', tracks)
    return tracks.map(convertTrackToMusic);
  } catch (error) {
    console.error('Erro ao buscar músicas:', error);
    return [];
  }
};