
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import PlaylistCard from '../components/PlaylistCard';
import MusicCard from '../components/MusicCard';
import type { RootState, AppDispatch } from '../store';
import { 
  createPlaylist, 
  updatePlaylist, 
  deletePlaylist,
  removeMusicFromPlaylist 
} from '../store/playlistSlice';
import { updateLastPlaylist } from '../store/authSlice';
import type { Playlist } from '../types';

const Playlists = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { playlists } = useSelector((state: RootState) => state.playlists);
  const user = useSelector((state: RootState) => state.auth.user);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [editPlaylistName, setEditPlaylistName] = useState('');

  const userPlaylists = playlists.filter(p => p.usuarioId === user?.id);

  const handleCreate = () => {
    if (!newPlaylistName.trim() || !user) return;
    
    dispatch(createPlaylist({ 
      nome: newPlaylistName, 
      usuarioId: user.id 
    }));
    
    setNewPlaylistName('');
    setShowCreateModal(false);
  };

  const handleView = (playlistId: string) => {
    const playlist = playlists.find(p => p.id === playlistId);
    if (playlist) {
      setSelectedPlaylist(playlist);
      setShowViewModal(true);
      dispatch(updateLastPlaylist(playlistId));
    }
  };

  const handleEdit = (playlistId: string) => {
    const playlist = playlists.find(p => p.id === playlistId);
    if (playlist) {
      setSelectedPlaylist(playlist);
      setEditPlaylistName(playlist.nome);
      setShowEditModal(true);
    }
  };

  const handleUpdatePlaylist = () => {
    if (!selectedPlaylist || !editPlaylistName.trim()) return;
    
    dispatch(updatePlaylist({
      ...selectedPlaylist,
      nome: editPlaylistName
    }));
    
    setShowEditModal(false);
    setSelectedPlaylist(null);
  };

  const handleDelete = (playlistId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta playlist?')) {
      dispatch(deletePlaylist(playlistId));
    }
  };

  useEffect(() => {
  if (selectedPlaylist) {
    const updated = playlists.find(p => p.id === selectedPlaylist.id);
    if (updated) setSelectedPlaylist(updated);
  }
}, [playlists]);

  const handleRemoveMusic = (musicId: string) => {
    if (!selectedPlaylist) return;
    if (window.confirm('Tem certeza que deseja excluir esta música?')) {
      dispatch(removeMusicFromPlaylist({ 
        playlistId: selectedPlaylist.id, 
        musicId 
      }));
    }
  };

  return (
    <div style={styles.page}>
      <Header />
      
      <main style={styles.main}>
        <div style={styles.header}>
          <h1 style={styles.title}>📀 Minhas Playlists</h1>
          <button onClick={() => setShowCreateModal(true)} style={styles.createBtn}>
            ➕ Nova Playlist
          </button>
        </div>

        {userPlaylists.length === 0 ? (
          <div style={styles.empty}>
            <p style={styles.emptyText}>Você ainda não tem playlists 😢</p>
            <p style={styles.emptySubtext}>Crie sua primeira playlist e comece a adicionar músicas!</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {userPlaylists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {showCreateModal && (
          <div style={styles.modal} onClick={() => setShowCreateModal(false)}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <h2 style={styles.modalTitle}>Criar Nova Playlist</h2>
              <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="Nome da playlist"
                style={styles.input}
                autoFocus
              />
              <div style={styles.modalActions}>
                <button onClick={() => setShowCreateModal(false)} style={styles.cancelBtn}>
                  Cancelar
                </button>
                <button onClick={handleCreate} style={styles.confirmBtn}>
                  Criar
                </button>
              </div>
            </div>
          </div>
        )}

        {showEditModal && selectedPlaylist && (
          <div style={styles.modal} onClick={() => setShowEditModal(false)}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <h2 style={styles.modalTitle}>Editar Playlist</h2>
              <input
                type="text"
                value={editPlaylistName}
                onChange={(e) => setEditPlaylistName(e.target.value)}
                style={styles.input}
                autoFocus
              />
              <div style={styles.modalActions}>
                <button onClick={() => setShowEditModal(false)} style={styles.cancelBtn}>
                  Cancelar
                </button>
                <button onClick={handleUpdatePlaylist} style={styles.confirmBtn}>
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}

        {showViewModal && selectedPlaylist && (
          <div style={styles.modal} onClick={() => setShowViewModal(false)}>
            <div style={{...styles.modalContent, ...styles.largeModal}} onClick={(e) => e.stopPropagation()}>
              <h2 style={styles.modalTitle}>📀 {selectedPlaylist.nome}</h2>
              <p style={styles.modalSubtitle}>{selectedPlaylist.musicas.length} músicas</p>
              
              {selectedPlaylist.musicas.length === 0 ? (
                <p style={styles.emptyPlaylist}>
                  Esta playlist ainda não tem músicas. Vá para "Buscar Músicas" para adicionar!
                </p>
              ) : (
                <div style={styles.musicGrid}>
                  {selectedPlaylist.musicas.map((music) => (
                    <MusicCard
                      key={music.id}
                      music={music}
                      onRemove={handleRemoveMusic}
                      showRemoveButton={true}
                    />
                  ))}
                </div>
              )}
              
              <button onClick={() => setShowViewModal(false)} style={styles.closeBtn}>
                Fechar
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  title: {
    margin: 0,
    fontSize: '2rem',
    color: '#1a1a2e'
  },
  createBtn: {
    backgroundColor: '#16213e',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem'
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
    width: '100%'
  },
  largeModal: {
    maxWidth: '900px',
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
    color: '#666'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '2px solid #e0e0e0',
    borderRadius: '6px',
    fontSize: '1rem',
    marginBottom: '1.5rem',
    boxSizing: 'border-box'
  },
  modalActions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end'
  },
  cancelBtn: {
    backgroundColor: '#e0e0e0',
    color: '#333',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500'
  },
  confirmBtn: {
    backgroundColor: '#16213e',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500'
  },
  closeBtn: {
    width: '100%',
    backgroundColor: '#16213e',
    color: 'white',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    marginTop: '1.5rem'
  },
  musicGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem'
  },
  emptyPlaylist: {
    textAlign: 'center',
    color: '#999',
    padding: '2rem'
  }
};

export default Playlists;