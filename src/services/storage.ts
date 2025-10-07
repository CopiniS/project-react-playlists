
import type { Playlist, User } from '../types';

const PLAYLISTS_KEY = 'playlists';
const USER_SESSION_KEY = 'userSession';

export const getPlaylistsFromStorage = (): Playlist[] => {
  try {
    const data = localStorage.getItem(PLAYLISTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao carregar playlists:', error);
    return [];
  }
};

export const savePlaylistsToStorage = (playlists: Playlist[]): void => {
  try {
    localStorage.setItem(PLAYLISTS_KEY, JSON.stringify(playlists));
  } catch (error) {
    console.error('Erro ao salvar playlists:', error);
  }
};

export const saveUserSession = (user: User): void => {
  try {
    sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Erro ao salvar sessão:', error);
  }
};

export const getUserSession = (): User | null => {
  try {
    const data = sessionStorage.getItem(USER_SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erro ao carregar sessão:', error);
    return null;
  }
};

export const clearUserSession = (): void => {
  try {
    sessionStorage.removeItem(USER_SESSION_KEY);
  } catch (error) {
    console.error('Erro ao limpar sessão:', error);
  }
};

export const updateLastPlaylistAccessed = (playlistId: string): void => {
  const session = getUserSession();
  if (session) {
    session.lastPlaylistAccessed = playlistId;
    saveUserSession(session);
  }
};