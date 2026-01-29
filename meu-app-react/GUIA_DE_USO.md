# Guia de Uso - Sistema de Autenticação

Este guia mostra como usar os componentes e serviços de autenticação criados no projeto.

## 📁 Estrutura de Arquivos

```
src/
├── components/
│   ├── Login.tsx          # Página de login
│   ├── Login.css          # Estilos do login
│   ├── Dashboard.tsx      # Página do dashboard (exemplo)
│   ├── Dashboard.css      # Estilos do dashboard
│   └── ProtectedRoute.tsx # Componente para proteger rotas
├── contexts/
│   └── AuthContext.tsx    # Contexto de autenticação
├── services/
│   └── auth.ts            # Serviço de autenticação
└── App.tsx                # Componente principal
```

## 🚀 Como Usar

### 1. Configurar o AuthProvider

Primeiro, envolva sua aplicação com o `AuthProvider` no arquivo `main.tsx`:

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

### 2. Usar o Hook useAuth

Em qualquer componente, você pode usar o hook `useAuth` para acessar informações de autenticação:

```tsx
import { useAuth } from './contexts/AuthContext';

function MeuComponente() {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Olá, {user?.name}!</p>
          <button onClick={logout}>Sair</button>
        </div>
      ) : (
        <p>Você não está autenticado</p>
      )}
    </div>
  );
}
```

### 3. Proteger Rotas

Use o componente `ProtectedRoute` para proteger páginas que requerem autenticação:

```tsx
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <ProtectedRoute fallback={<Login />}>
      <Dashboard />
    </ProtectedRoute>
  );
}
```

### 4. Integrar com API Backend

#### Configurar URL da API

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000/api
```

#### Usar o Serviço de Autenticação

O serviço `authService` já está pronto para ser usado. Basta descomentar o código no componente `Login.tsx`:

```tsx
import authService from '../services/auth';

// No handleSubmit:
try {
  const response = await authService.login(formData);
  console.log('Login bem-sucedido:', response.user);
  // Redirecionar para dashboard
} catch (err) {
  setError(err.message);
}
```

### 5. Fazer Requisições Autenticadas

Para fazer requisições autenticadas para sua API:

```tsx
import authService from './services/auth';

async function buscarDados() {
  const response = await fetch('http://localhost:3000/api/dados', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...authService.getAuthHeader(), // Adiciona o token
    },
  });

  const data = await response.json();
  return data;
}
```

## 🔧 Métodos Disponíveis no AuthService

### `login(credentials)`
Faz login do usuário e salva o token.

```tsx
await authService.login({ email: 'user@example.com', password: '123456' });
```

### `register(userData)`
Registra um novo usuário.

```tsx
await authService.register({
  name: 'João Silva',
  email: 'joao@example.com',
  password: '123456'
});
```

### `logout()`
Faz logout e remove o token.

```tsx
authService.logout();
```

### `isAuthenticated()`
Verifica se o usuário está autenticado.

```tsx
const isAuth = authService.isAuthenticated();
```

### `getToken()`
Retorna o token de autenticação.

```tsx
const token = authService.getToken();
```

### `getAuthHeader()`
Retorna o header de autenticação para requisições.

```tsx
const headers = authService.getAuthHeader();
// { Authorization: 'Bearer token...' }
```

### `validateToken()`
Valida o token com o backend.

```tsx
const isValid = await authService.validateToken();
```

### `forgotPassword(email)`
Solicita recuperação de senha.

```tsx
await authService.forgotPassword('user@example.com');
```

### `resetPassword(token, newPassword)`
Reseta a senha do usuário.

```tsx
await authService.resetPassword('reset-token', 'nova-senha');
```

## 🎨 Customização

### Alterar Cores do Tema

Edite o arquivo `Login.css` ou `Dashboard.css` e altere as cores do gradiente:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Troque `#667eea` e `#764ba2` pelas cores desejadas.

### Adicionar Novos Campos no Login

1. Adicione o campo no estado do componente:

```tsx
const [formData, setFormData] = useState({
  email: '',
  password: '',
  remember: false // novo campo
});
```

2. Adicione o input no formulário:

```tsx
<input
  type="checkbox"
  name="remember"
  checked={formData.remember}
  onChange={handleChange}
/>
```

## 🔒 Segurança

### Boas Práticas Implementadas

- ✅ Token armazenado no localStorage
- ✅ Validação de formulários
- ✅ Feedback visual de erros
- ✅ Loading states
- ✅ Headers de autenticação automáticos

### Recomendações Adicionais

- Use HTTPS em produção
- Implemente refresh tokens
- Adicione rate limiting na API
- Use cookies HttpOnly para tokens (mais seguro que localStorage)
- Implemente autenticação de dois fatores (2FA)

## 🧪 Testando Localmente

1. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

2. Acesse `http://localhost:5173/`

3. O login está em modo de simulação. Para testar:
   - Digite qualquer email válido
   - Digite qualquer senha
   - Clique em "Entrar"
   - Verá um alert de sucesso

## 📚 Próximos Passos

1. **Integrar com Backend**
   - Descomente o código de integração em `Login.tsx`
   - Configure a URL da API no arquivo `.env`
   - Ajuste as interfaces de dados conforme sua API

2. **Adicionar Rotas**
   - Instale `react-router-dom`: `npm install react-router-dom`
   - Configure rotas para diferentes páginas
   - Use `ProtectedRoute` para proteger rotas privadas

3. **Criar Mais Páginas**
   - Página de Cadastro
   - Página de Recuperação de Senha
   - Página de Perfil do Usuário

4. **Adicionar Testes**
   - Instale Jest e React Testing Library
   - Escreva testes para componentes e serviços

## ❓ Problemas Comuns

### Token expira muito rápido
Implemente um sistema de refresh token no backend e frontend.

### Erro de CORS
Configure o backend para aceitar requisições do frontend:
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### Usuário não persiste após reload
Certifique-se de que o `AuthProvider` está validando o token ao carregar a aplicação.

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação ou abra uma issue no repositório.

