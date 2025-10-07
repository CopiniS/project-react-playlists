
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { validateLoginForm } from '../utils/validation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loginError, setLoginError] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    const validation = validateLoginForm(email, password);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    setErrors({});
    
    dispatch(login({ email, password }));
    
    if (
      (email === 'usuario@playlist.com' && password === '123456')
      || (email == 'usuario_2@playlist.com' && password == '654321')
    ) {
      navigate('/home');
    } else {
      setLoginError('Email ou senha inválidos');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h1 style={styles.title}>🎵 Playlist Manager</h1>
        <p style={styles.subtitle}>Faça login para gerenciar suas playlists</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="usuario@playlist.com"
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Mínimo 6 caracteres"
            />
            {errors.password && <span style={styles.error}>{errors.password}</span>}
          </div>

          {loginError && <div style={styles.loginError}>{loginError}</div>}

          <button type="submit" style={styles.button}>
            Entrar
          </button>
        </form>

        <div style={styles.hint}>
          <p style={styles.hintText}>💡 Credenciais de teste:</p>
          <p style={styles.hintText}>Email: usuario@playlist.com</p>
          <p style={styles.hintText}>Senha: 123456</p>
          <p style={styles.hintText}>Email 2: usuario_2@playlist.com</p>
          <p style={styles.hintText}>Senha 2: 654321</p>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f3460',
    padding: '1rem'
  },
  loginBox: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '400px'
  },
  title: {
    margin: '0 0 0.5rem 0',
    color: '#1a1a2e',
    textAlign: 'center',
    fontSize: '2rem'
  },
  subtitle: {
    margin: '0 0 2rem 0',
    color: '#666',
    textAlign: 'center',
    fontSize: '0.95rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontWeight: '500',
    color: '#1a1a2e',
    fontSize: '0.95rem'
  },
  input: {
    padding: '0.75rem',
    border: '2px solid #e0e0e0',
    borderRadius: '6px',
    fontSize: '1rem',
    transition: 'border-color 0.2s'
  },
  error: {
    color: '#e94560',
    fontSize: '0.85rem'
  },
  loginError: {
    backgroundColor: '#ffe0e6',
    color: '#e94560',
    padding: '0.75rem',
    borderRadius: '6px',
    textAlign: 'center',
    fontSize: '0.9rem'
  },
  button: {
    backgroundColor: '#16213e',
    color: 'white',
    border: 'none',
    padding: '1rem',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  hint: {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#f5f5f5',
    borderRadius: '6px',
    textAlign: 'center'
  },
  hintText: {
    margin: '0.25rem 0',
    fontSize: '0.85rem',
    color: '#666'
  }
};

export default Login;