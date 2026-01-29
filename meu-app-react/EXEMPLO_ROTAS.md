# Exemplo de Configuração de Rotas

Este arquivo mostra como configurar rotas usando React Router no sistema de autenticação.

## 📦 Instalação

Primeiro, instale o React Router:

```bash
npm install react-router-dom
```

## 🛣️ Configuração Básica

### 1. Atualizar o `App.tsx`

```tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            borderTopColor: 'white',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }} />
          <p style={{
            color: 'white',
            fontSize: '18px',
            fontWeight: '500'
          }}>
            Carregando...
          </p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública - Login */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          } 
        />

        {/* Rotas protegidas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute fallback={<Navigate to="/login" replace />}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Rota padrão */}
        <Route 
          path="/" 
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} 
        />

        {/* Página 404 */}
        <Route 
          path="*" 
          element={
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              textAlign: 'center',
              padding: '20px'
            }}>
              <div>
                <h1 style={{ fontSize: '72px', margin: '0' }}>404</h1>
                <p style={{ fontSize: '24px', margin: '16px 0' }}>Página não encontrada</p>
                <a 
                  href="/" 
                  style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    marginTop: '16px'
                  }}
                >
                  Voltar ao Início
                </a>
              </div>
            </div>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### 2. Atualizar o `main.tsx`

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './contexts/AuthContext'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
```

### 3. Atualizar o `Login.tsx` para redirecionar após login

Adicione o hook `useNavigate` no componente Login:

```tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // ... resto do código ...

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validações...

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard'); // Redireciona para o dashboard
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer login.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // ... resto do código ...
}
```

### 4. Atualizar o `Dashboard.tsx` para usar navegação

```tsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-content">
          <h2>Sistema de Auth</h2>
          <button onClick={handleLogout} className="logout-button">
            {/* ... ícone ... */}
            Sair
          </button>
        </div>
      </nav>
      {/* ... resto do código ... */}
    </div>
  );
}
```

## 🎯 Estrutura de Rotas Completa

Aqui está um exemplo de estrutura com múltiplas páginas:

```tsx
<Routes>
  {/* Rotas públicas */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/reset-password/:token" element={<ResetPassword />} />

  {/* Rotas protegidas */}
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
  <Route
    path="/profile"
    element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    }
  />
  <Route
    path="/settings"
    element={
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    }
  />

  {/* Rota padrão e 404 */}
  <Route path="/" element={<Navigate to="/dashboard" />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

## 🔗 Links de Navegação

### No Dashboard

```tsx
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Perfil</Link>
        <Link to="/settings">Configurações</Link>
      </nav>
    </div>
  );
}
```

### Navegação Programática

```tsx
import { useNavigate } from 'react-router-dom';

function MeuComponente() {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navegar para outra página
    navigate('/dashboard');

    // Voltar
    navigate(-1);

    // Navegar e substituir histórico
    navigate('/login', { replace: true });
  };

  return <button onClick={handleClick}>Ir para Dashboard</button>;
}
```

## 🛡️ Rotas Protegidas Avançadas

### Com Roles/Permissões

```tsx
interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
}

function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}

// Uso:
<Route
  path="/admin"
  element={
    <ProtectedRoute requiredRole="admin">
      <AdminPanel />
    </ProtectedRoute>
  }
/>
```

## 📱 Layout Compartilhado

Crie um layout para páginas autenticadas:

```tsx
// components/AuthLayout.tsx
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function AuthLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="layout">
      <nav className="sidebar">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Perfil</Link>
        <Link to="/settings">Configurações</Link>
      </nav>
      <main>
        <header>
          <span>{user?.name}</span>
          <button onClick={logout}>Sair</button>
        </header>
        <Outlet /> {/* Renderiza as rotas filhas */}
      </main>
    </div>
  );
}

// App.tsx
<Routes>
  <Route element={<AuthLayout />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/settings" element={<Settings />} />
  </Route>
</Routes>
```

## 🎨 Transições de Página

Com animações usando CSS:

```tsx
import { useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={300}
      >
        <Routes location={location}>
          {/* suas rotas */}
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

// CSS
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  opacity: 1;
  transition: opacity 300ms;
}
.fade-exit {
  opacity: 1;
}
.fade-exit-active {
  opacity: 0;
  transition: opacity 300ms;
}
```

## 📝 Dicas

1. **Sempre use `Navigate` com `replace`** para rotas de autenticação para evitar loops
2. **Use `useNavigate` em vez de `<Link>`** quando precisar de lógica adicional
3. **Proteja rotas sensíveis** sempre com `ProtectedRoute`
4. **Teste a navegação** com o histórico do navegador (botões voltar/avançar)
5. **Use lazy loading** para otimizar o carregamento: `const Dashboard = lazy(() => import('./Dashboard'))`

