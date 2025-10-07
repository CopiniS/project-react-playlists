
import type { Playlist } from '../types';

interface PlaylistCardProps {
  playlist: Playlist;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const PlaylistCard = ({ playlist, onView, onEdit, onDelete }: PlaylistCardProps) => {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>📀 {playlist.nome}</h3>
        <span style={styles.count}>{playlist.musicas.length} músicas</span>
      </div>

      <div style={styles.info}>
        <p style={styles.date}>
          Criada em: {new Date(playlist.createdAt).toLocaleDateString('pt-BR')}
        </p>
      </div>

      <div style={styles.actions}>
        <button onClick={() => onView(playlist.id)} style={styles.viewBtn}>
          👁️ Ver
        </button>
        <button onClick={() => onEdit(playlist.id)} style={styles.editBtn}>
          ✏️ Editar
        </button>
        <button onClick={() => onDelete(playlist.id)} style={styles.deleteBtn}>
          🗑️ Excluir
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  title: {
    margin: 0,
    fontSize: '1.2rem',
    color: '#1a1a2e'
  },
  count: {
    backgroundColor: '#e8f4f8',
    color: '#0066cc',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.85rem',
    fontWeight: '500'
  },
  info: {
    marginBottom: '1rem'
  },
  date: {
    margin: 0,
    fontSize: '0.9rem',
    color: '#666'
  },
  actions: {
    display: 'flex',
    gap: '0.5rem'
  },
  viewBtn: {
    flex: 1,
    backgroundColor: '#16213e',
    color: 'white',
    border: 'none',
    padding: '0.6rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  editBtn: {
    flex: 1,
    backgroundColor: '#0f3460',
    color: 'white',
    border: 'none',
    padding: '0.6rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  deleteBtn: {
    flex: 1,
    backgroundColor: '#e94560',
    color: 'white',
    border: 'none',
    padding: '0.6rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500'
  }
};

export default PlaylistCard;