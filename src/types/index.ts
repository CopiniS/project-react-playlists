
export interface User {
  id: string;
  email: string;
  lastLogin?: string;
  lastPlaylistAccessed?: string;
}

export interface Music {
  id: string;
  nome: string;
  artista: string;
  genero: string;
  ano: string;
  thumb?: string;
}

export interface Playlist {
  id: string;
  nome: string;
  usuarioId: string;
  musicas: Music[];
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface PlaylistState {
  playlists: Playlist[];
  loading: boolean;
  error: string | null;
}

export interface MusicState {
  musicas: Music[];
  topMusicas: Music[];
  loading: boolean;
  error: string | null;
}

export interface AudioDBTrack {
  idTrack: string;
  strTrack: string;
  strArtist: string;
  strGenre: string;
  intYearReleased: string;
  strTrackThumb?: string;
}

export interface AudioDBArtist {
  idArtist: string;
  strArtist: string;
  strGenre: string;
  strArtistThumb?: string;
}