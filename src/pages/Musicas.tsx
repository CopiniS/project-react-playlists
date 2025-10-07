
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import type { RootState, AppDispatch } from '../store';
import { fetchMusicsByArtist, fetchMusicsByArtistAndTrack } from '../store/musicSlice';
import { addMusicToPlaylist } from '../store/playlistSlice';
import type { Music } from '../types';

const Musicas = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { musicas, loading } = useSelector((state: RootState) => state.music);
  const { playlists } = useSelector((state: RootState) => state.playlists);
  const user = useSelector((state: RootState) => state.auth.user);

  const [searchArtist, setSearchArtist] = useState('');
  const [searchTrack, setSearchTrack] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState<Music | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const userPlaylists = playlists.filter(p => p.usuarioId === user?.id);

  const handleSearch = () => {
    const artist = searchArtist.trim();
    const track = searchTrack.trim();

    if (!artist) {
      setErrorMessage('⚠️ O campo Artista é obrigatório!');
      return;
    }

    setErrorMessage('');

    if (artist && track) {
      console.log('lalanda')
      dispatch(fetchMusicsByArtistAndTrack({ artist, track }));
    }
    else {
      dispatch(fetchMusicsByArtist(artist));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const openAddModal = (music: Music) => {
    setSelectedMusic(music);
    setShowAddModal(true);
  };

  const handleAddToPlaylist = (playlistId: string) => {
    if (!selectedMusic) return;
    
    dispatch(addMusicToPlaylist({ 
      playlistId, 
      music: selectedMusic 
    }));
    
    setShowAddModal(false);
    setSelectedMusic(null);
    alert('Música adicionada com sucesso! 🎵');
  };

  const filteredMusics = musicas.filter((music) => {
    const artistTerm = searchArtist.toLowerCase();
    const trackTerm = searchTrack.toLowerCase();
    
    const matchArtist = !artistTerm || music.artista.toLowerCase().includes(artistTerm);
    const matchTrack = !trackTerm || music.nome.toLowerCase().includes(trackTerm);
    
    return matchArtist && matchTrack;
  });

  return (
    <div style={styles.page}>
      <Header />
      
      <main style={styles.main}>
        <div style={styles.searchSection}>
          <h1 style={styles.title}>🔍 Buscar Músicas</h1>
          <p style={styles.subtitle}>
            Pesquise por artista e música para encontrar o que procura
          </p>

          <div style={styles.inputsContainer}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                🎤 Artista <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                value={searchArtist}
                onChange={(e) => {
                  setSearchArtist(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                onKeyPress={handleKeyPress}
                placeholder="Ex: Coldplay, Queen, The Beatles..."
                style={{
                  ...styles.input,
                  ...(errorMessage ? styles.inputError : {})
                }}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>🎵 Música (opcional)</label>
              <input
                type="text"
                value={searchTrack}
                onChange={(e) => setSearchTrack(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ex: Bohemian Rhapsody, Yellow..."
                style={styles.input}
              />
            </div>
          </div>

          {errorMessage && (
            <div style={styles.errorBox}>
              {errorMessage}
            </div>
          )}

          <button 
            onClick={handleSearch} 
            style={{
              ...styles.searchBtn,
              ...(loading || !searchArtist.trim() ? styles.searchBtnDisabled : {})
            }}
            disabled={loading || !searchArtist.trim()}
          >
            {loading ? '⏳ Buscando...' : '🔍 Buscar'}
          </button>
        </div>

        {loading && (
          <div style={styles.loading}>
            <p>Carregando músicas... 🎵</p>
          </div>
        )}

        {!loading && musicas.length === 0 && (searchArtist || searchTrack) && (
          <div style={styles.empty}>
            <p style={styles.emptyText}>Nenhuma música encontrada 😢</p>
            <p style={styles.emptySubtext}>
              Tente buscar com outros termos ou apenas por artista
            </p>
          </div>
        )}

        {!loading && musicas.length === 0 && !searchArtist && !searchTrack && (
          <div style={styles.empty}>
            <p style={styles.emptyText}>🎵 Faça uma busca para começar!</p>
            <p style={styles.emptySubtext}>
              Preencha pelo menos um dos campos acima
            </p>
          </div>
        )}

        {!loading && filteredMusics.length > 0 && (
          <>
            <div style={styles.resultsHeader}>
              <h2 style={styles.resultsTitle}>
                Resultados ({filteredMusics.length} música{filteredMusics.length !== 1 ? 's' : ''})
              </h2>
              {(searchArtist || searchTrack) && (
                <p style={styles.searchInfo}>
                  Buscando por: 
                  {searchArtist && <strong> Artista: "{searchArtist}"</strong>}
                  {searchArtist && searchTrack && <span> + </span>}
                  {searchTrack && <strong> Música: "{searchTrack}"</strong>}
                </p>
              )}
            </div>

            <div style={styles.grid}>
              {filteredMusics.map((music) => (
                <MusicCard
                  key={music.id}
                  music={music}
                  onAdd={openAddModal}
                  showAddButton={true}
                />
              ))}
            </div>
          </>
        )}

        {showAddModal && selectedMusic && (
          <div style={styles.modal} onClick={() => setShowAddModal(false)}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <h2 style={styles.modalTitle}>Adicionar à Playlist</h2>
              <p style={styles.modalSubtitle}>
                Música: <strong>{selectedMusic.nome}</strong>
                <br />
                Artista: <strong>{selectedMusic.artista}</strong>
              </p>

              {userPlaylists.length === 0 ? (
                <p style={styles.noPlaylists}>
                  Você ainda não tem playlists. 😢<br />
                  Crie uma playlist primeiro!
                </p>
              ) : (
                <div style={styles.playlistList}>
                  {userPlaylists.map((playlist) => (
                    <button
                      key={playlist.id}
                      onClick={() => handleAddToPlaylist(playlist.id)}
                      style={styles.playlistBtn}
                    >
                      📀 {playlist.nome}
                      <span style={styles.playlistCount}>
                        {playlist.musicas.length} música{playlist.musicas.length !== 1 ? 's' : ''}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              <button 
                onClick={() => setShowAddModal(false)} 
                style={styles.cancelBtn}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem'
  },
  searchSection: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    marginBottom: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  title: {
    margin: '0 0 0.5rem 0',
    fontSize: '2rem',
    color: '#1a1a2e'
  },
  subtitle: {
    margin: '0 0 1.5rem 0',
    color: '#666',
    fontSize: '1rem'
  },
  inputsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginBottom: '1rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#1a1a2e'
  },
  input: {
    padding: '0.75rem 1rem',
    border: '2px solid #e0e0e0',
    borderRadius: '6px',
    fontSize: '1rem',
    transition: 'border-color 0.2s'
  },
  searchBtn: {
    width: '100%',
    backgroundColor: '#16213e',
    color: 'white',
    border: 'none',
    padding: '0.75rem 2rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '1rem'
  },
  hints: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: '1rem',
    padding: '0.75rem',
    backgroundColor: '#e8f4f8',
    borderRadius: '6px'
  },
  hint: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#1a1a2e'
  },
  hintText: {
    fontSize: '0.9rem',
    color: '#666'
  },
  examples: {
    backgroundColor: '#f5f5f5',
    padding: '1rem',
    borderRadius: '6px',
    border: '1px solid #e0e0e0'
  },
  exampleTitle: {
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: '0.5rem'
  },
  exampleList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  },
  example: {
    fontSize: '0.85rem',
    color: '#666'
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.2rem',
    color: '#666'
  },
  empty: {
    textAlign: 'center',
    padding: '4rem 2rem',
    backgroundColor: 'white',
    borderRadius: '8px'
  },
  emptyText: {
    fontSize: '1.5rem',
    color: '#1a1a2e',
    margin: '0 0 0.5rem 0'
  },
  emptySubtext: {
    fontSize: '1rem',
    color: '#666',
    margin: 0
  },
  resultsHeader: {
    marginBottom: '1.5rem'
  },
  resultsTitle: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.5rem',
    color: '#1a1a2e'
  },
  searchInfo: {
    margin: 0,
    fontSize: '0.95rem',
    color: '#666'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '1rem'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    minWidth: '300px',
    maxWidth: '500px',
    width: '100%',
    maxHeight: '80vh',
    overflow: 'auto'
  },
  modalTitle: {
    margin: '0 0 1rem 0',
    fontSize: '1.5rem',
    color: '#1a1a2e'
  },
  modalSubtitle: {
    margin: '0 0 1.5rem 0',
    color: '#666',
    lineHeight: '1.6'
  },
  noPlaylists: {
    textAlign: 'center',
    color: '#999',
    padding: '2rem 0',
    lineHeight: '1.8'
  },
  playlistList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginBottom: '1.5rem'
  },
  playlistBtn: {
    backgroundColor: '#f5f5f5',
    border: '2px solid #e0e0e0',
    padding: '1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all 0.2s'
  },
  playlistCount: {
    fontSize: '0.85rem',
    color: '#666',
    backgroundColor: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px'
  },
  cancelBtn: {
    width: '100%',
    backgroundColor: '#e0e0e0',
    color: '#333',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500'
  }
};

export default Musicas;