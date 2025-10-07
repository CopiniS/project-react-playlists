
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { fetchTopMusics } from '../store/musicSlice';
import type{ RootState, AppDispatch } from '../store';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { topMusicas, loading } = useSelector((state: RootState) => state.music);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    dispatch(fetchTopMusics());
  }, [dispatch]);

  return (
    <div style={styles.page}>
      <Header />
      
      <main style={styles.main}>
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>Bem-vindo, {user?.email}! 👋</h1>
          <p style={styles.heroText}>
            Gerencie suas playlists favoritas e descubra novas músicas
          </p>
        </div>

        <div style={styles.stats}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>🎵</div>
            <div>
              <div style={styles.statNumber}>∞</div>
              <div style={styles.statLabel}>Músicas Disponíveis</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>📀</div>
            <div>
              <div style={styles.statNumber}>Ilimitadas</div>
              <div style={styles.statLabel}>Playlists</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>🎤</div>
            <div>
              <div style={styles.statNumber}>Todos</div>
              <div style={styles.statLabel}>Artistas</div>
            </div>
          </div>
        </div>

        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>🔥 Músicas Populares</h2>
            <Link to="/musicas" style={styles.link}>Ver mais →</Link>
          </div>

          {loading && <p style={styles.loading}>Carregando músicas...</p>}

          <div style={styles.grid}>
            {topMusicas.slice(0, 6).map((music) => (
              <MusicCard key={music.id} music={music} />
            ))}
          </div>

          {!loading && topMusicas.length === 0 && (
            <p style={styles.empty}>Nenhuma música encontrada</p>
          )}
        </section>

        <section style={styles.cta}>
          <h2 style={styles.ctaTitle}>Pronto para criar sua playlist? 🎶</h2>
          <Link to="/playlists" style={styles.ctaButton}>
            Ir para Minhas Playlists
          </Link>
        </section>
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
  hero: {
    textAlign: 'center',
    marginBottom: '3rem'
  },
  heroTitle: {
    margin: '0 0 0.5rem 0',
    fontSize: '2.5rem',
    color: '#1a1a2e'
  },
  heroText: {
    margin: 0,
    fontSize: '1.2rem',
    color: '#666'
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '3rem'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  statIcon: {
    fontSize: '2.5rem'
  },
  statNumber: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1a1a2e'
  },
  statLabel: {
    fontSize: '0.9rem',
    color: '#666'
  },
  section: {
    marginBottom: '3rem'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
  },
  sectionTitle: {
    margin: 0,
    fontSize: '1.8rem',
    color: '#1a1a2e'
  },
  link: {
    color: '#0066cc',
    textDecoration: 'none',
    fontWeight: '500'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem'
  },
  loading: {
    textAlign: 'center',
    color: '#666',
    fontSize: '1.1rem'
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    fontSize: '1rem'
  },
  cta: {
    backgroundColor: '#16213e',
    padding: '3rem 2rem',
    borderRadius: '12px',
    textAlign: 'center'
  },
  ctaTitle: {
    margin: '0 0 1.5rem 0',
    color: 'white',
    fontSize: '2rem'
  },
  ctaButton: {
    display: 'inline-block',
    backgroundColor: '#e94560',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1.1rem'
  }
};

export default Home;