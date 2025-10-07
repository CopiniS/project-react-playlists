
import type { Music } from '../types';

interface MusicCardProps {
  music: Music;
  onAdd?: (music: Music) => void;
  onRemove?: (musicId: string) => void;
  showAddButton?: boolean;
  showRemoveButton?: boolean;
}

const MusicCard = ({ 
  music, 
  onAdd, 
  onRemove, 
  showAddButton = false,
  showRemoveButton = false 
}: MusicCardProps) => {
  return (
    <div style={styles.card}>
      {music.thumb && (
        <img src={music.thumb} alt={music.nome} style={styles.thumbnail} />
      )}
      
      <div style={styles.content}>
        <h3 style={styles.title}>{music.nome}</h3>
        <p style={styles.artist}>🎤 {music.artista}</p>
        <div style={styles.info}>
          <span style={styles.badge}>{music.genero}</span>
          <span style={styles.year}>📅 {music.ano}</span>
        </div>
      </div>

      <div style={styles.actions}>
        {showAddButton && onAdd && (
          <button 
            onClick={() => onAdd(music)} 
            style={styles.addBtn}
          >
            ➕ Adicionar
          </button>
        )}
        
        {showRemoveButton && onRemove && (
          <button 
            onClick={() => onRemove(music.id)} 
            style={styles.removeBtn}
          >
            🗑️ Remover
          </button>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  thumbnail: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '4px'
  },
  content: {
    flex: 1
  },
  title: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.1rem',
    color: '#1a1a2e'
  },
  artist: {
    margin: '0 0 0.5rem 0',
    color: '#666',
    fontSize: '0.95rem'
  },
  info: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  badge: {
    backgroundColor: '#e8f4f8',
    color: '#0066cc',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.85rem',
    fontWeight: '500'
  },
  year: {
    fontSize: '0.85rem',
    color: '#999'
  },
  actions: {
    display: 'flex',
    gap: '0.5rem'
  },
  addBtn: {
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
  removeBtn: {
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

export default MusicCard;