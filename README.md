# 🎵 Playlist Manager

Sistema completo de gerenciamento de playlists musicais desenvolvido com React + TypeScript + Vite.

## 📋 Funcionalidades Implementadas

### ✅ Autenticação
- Login com validação de email e senha
- Credenciais estáticas: `usuario@playlist.com` / `123456`
- SessionStorage para dados temporários da sessão
- Logout com limpeza de sessão

### ✅ Rotas Protegidas
- Componente `PrivateRoute` protege rotas
- Apenas usuários autenticados acessam: `/home`, `/playlists`, `/musicas`
- Redirecionamento automático para login

### ✅ CRUD de Playlists
- **Create**: Criar novas playlists
- **Read**: Listar playlists do usuário
- **Update**: Editar nome das playlists
- **Delete**: Excluir playlists com confirmação
- **Persistência**: LocalStorage
- **Segurança**: Usuário só vê/edita suas próprias playlists

### ✅ Integração com API TheAudioDB
- Busca de músicas por artista
- Top 3 músicas mais populares dos EUA com esse código:
  ```bash
  https://www.theaudiodb.com/api/v1/json/2/trending.php?country=us&type=itunes&format=singles
  ```
- Adicionar músicas da API às playlists
- Filtros em tempo real por nome da música, quando o usuário busca apenas por artista.

### ✅ Redux (Estado Global)
- **authSlice**: Gerencia autenticação
- **playlistSlice**: Gerencia CRUD de playlists
- **musicSlice**: Gerencia busca de músicas
- Sincronização automática com LocalStorage

### ✅ LocalStorage & SessionStorage
- **LocalStorage**: Persistência de playlists
- **SessionStorage**: Dados temporários (último login, última playlist acessada)

## 🚀 Como Executar

### 1. Fazer o git pull
Exemplo com  HTTPS
```bash
git pull https://github.com/CopiniS/project-react-playlists.git
```

### 2. Instalar Dependências
```bash
npm install
```

### 4. Executar
```bash
npm run dev
```

### 5. Acessar
Abra `http://localhost:5173` no navegador

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── PrivateRoute.tsx      # Proteção de rotas
│   ├── Header.tsx             # Cabeçalho da aplicação
│   ├── PlaylistCard.tsx       # Card de playlist
│   └── MusicCard.tsx          # Card de música
├── pages/
│   ├── Login.tsx              # Página de login
│   ├── Home.tsx               # Página inicial
│   ├── Playlists.tsx          # Gerenciamento de playlists
│   └── Musicas.tsx            # Busca de músicas
├── store/
│   ├── index.ts               # Configuração da store
│   ├── authSlice.ts           # Slice de autenticação
│   ├── playlistSlice.ts       # Slice de playlists
│   └── musicSlice.ts          # Slice de músicas
├── services/
│   ├── api.ts                 # Integração com TheAudioDB
│   └── storage.ts             # LocalStorage & SessionStorage
├── types/
│   └── index.ts               # Definições TypeScript
├── utils/
│   └── validation.ts          # Validações do formulário
├── App.tsx                    # Configuração de rotas
├── main.tsx                   # Entry point
└── index.css                  # Estilos globais
```

## 🔑 Credenciais de Teste

- **Email**: `usuario@playlist.com`
- **Senha**: `123456`

## 🎯 Tecnologias Utilizadas

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool moderna
- **React Router v6** - Roteamento
- **Redux Toolkit** - Estado global
- **Axios** - Cliente HTTP
- **TheAudioDB API** - Dados de músicas

## 📝 Funcionalidades Detalhadas

### Login (/login)
- Validação de formato de email
- Validação de senha (mínimo 6 caracteres)
- Mensagens de erro específicas
- Salvamento de sessão no sessionStorage

### Home (/home)
- Boas-vindas personalizadas
- Cards com estatísticas
- Top 3 músicas mais populares
- Links para outras seções

### Playlists (/playlists)
- Criar nova playlist
- Listar playlists do usuário
- Ver músicas de uma playlist
- Editar nome da playlist
- Excluir playlist
