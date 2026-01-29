# ✅ Checklist de Integração com Backend

Use este checklist para integrar o frontend com sua API backend.

## 📋 Antes de Começar

- [ ] Backend está rodando e acessível
- [ ] Documentação da API está disponível
- [ ] Endpoints de autenticação estão implementados
- [ ] CORS configurado no backend
- [ ] Variáveis de ambiente definidas

## 🔧 Configuração Inicial

### 1. Configurar Variáveis de Ambiente

- [ ] Criar arquivo `.env` na raiz do projeto
- [ ] Adicionar `VITE_API_URL=http://localhost:3000/api` (ou sua URL)
- [ ] Adicionar outras variáveis necessárias
- [ ] Adicionar `.env` no `.gitignore`

**Exemplo de `.env`:**
```env
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000
```

### 2. Verificar Estrutura da API

Confirme que sua API tem estes endpoints:

- [ ] `POST /api/auth/login` - Login
- [ ] `POST /api/auth/register` - Cadastro
- [ ] `GET /api/auth/validate` - Validar token
- [ ] `POST /api/auth/forgot-password` - Recuperar senha
- [ ] `POST /api/auth/reset-password` - Resetar senha

## 🔗 Integração Passo a Passo

### Passo 1: Verificar Formato dos Dados

**Request esperado (Login):**
```json
{
  "email": "user@example.com",
  "password": "senha123"
}
```

**Response esperado (Login):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "Nome do Usuário"
  }
}
```

- [ ] Verificar se os campos batem com `src/services/auth.ts`
- [ ] Ajustar interfaces TypeScript se necessário

### Passo 2: Atualizar AuthContext

**Arquivo: `src/contexts/AuthContext.tsx`**

- [ ] Descomentar import do authService
- [ ] Verificar se o método `validateToken()` está sendo usado
- [ ] Testar se o contexto persiste após reload

### Passo 3: Atualizar Login

**Arquivo: `src/components/Login.tsx`**

- [ ] Descomentar linha: `import authService from '../services/auth'`
- [ ] Localizar a função `handleSubmit`
- [ ] Substituir código de simulação:

**De:**
```tsx
// Simulação de login
await new Promise(resolve => setTimeout(resolve, 1500));
console.log('Login realizado com:', formData);
alert('Login realizado com sucesso!');
```

**Para:**
```tsx
// Login real com API
await login(formData.email, formData.password);
navigate('/dashboard'); // Se usar React Router
```

- [ ] Testar login com credenciais válidas
- [ ] Testar login com credenciais inválidas
- [ ] Verificar se erros são exibidos corretamente

### Passo 4: Atualizar Register

**Arquivo: `src/components/Register.tsx`**

- [ ] Descomentar import do authService
- [ ] Substituir simulação por chamada real:

```tsx
const response = await authService.register({
  name: formData.name,
  email: formData.email,
  password: formData.password
});
```

- [ ] Testar cadastro de novo usuário
- [ ] Verificar validações do backend
- [ ] Verificar se redireciona após sucesso

### Passo 5: Configurar Rotas (se usar React Router)

- [ ] Instalar React Router: `npm install react-router-dom`
- [ ] Atualizar `App.tsx` com BrowserRouter
- [ ] Configurar rotas públicas e protegidas
- [ ] Adicionar redirecionamento após login
- [ ] Adicionar redirecionamento após logout

**Consultar:** `EXEMPLO_ROTAS.md` para código completo

### Passo 6: Testar Fluxo Completo

- [ ] Abrir aplicação no navegador
- [ ] Fazer cadastro de novo usuário
- [ ] Fazer login
- [ ] Verificar se dashboard é exibido
- [ ] Recarregar página (deve manter login)
- [ ] Fazer logout
- [ ] Verificar se volta para login

## 🔒 Segurança

### Headers CORS

Certifique-se de que o backend aceita requisições do frontend:

**Node.js/Express exemplo:**
```javascript
app.use(cors({
  origin: 'http://localhost:5173', // URL do frontend
  credentials: true
}));
```

- [ ] CORS configurado
- [ ] Headers aceitos: Content-Type, Authorization
- [ ] Métodos aceitos: GET, POST, PUT, DELETE

### Autenticação

- [ ] Token JWT sendo retornado pelo backend
- [ ] Token sendo salvo no localStorage
- [ ] Token sendo enviado em requisições:
  ```typescript
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
  ```

## 🧪 Testes

### Login
- [ ] Login com credenciais válidas
- [ ] Login com credenciais inválidas
- [ ] Mensagem de erro correta
- [ ] Loading state funciona
- [ ] Token salvo no localStorage
- [ ] Redirecionamento funciona

### Cadastro
- [ ] Cadastro com dados válidos
- [ ] Email já existente retorna erro
- [ ] Validações do backend funcionam
- [ ] Token salvo após cadastro
- [ ] Redirecionamento funciona

### Dashboard
- [ ] Dados do usuário são exibidos
- [ ] Logout remove token
- [ ] Logout redireciona para login

### Persistência
- [ ] Reload mantém usuário logado
- [ ] Token expirado desloga usuário
- [ ] Token inválido desloga usuário

## 🐛 Debugging

### Problema: CORS Error

**Erro no console:**
```
Access to fetch at 'http://localhost:3000/api/auth/login' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solução:**
- Configurar CORS no backend
- Adicionar origem do frontend nas configurações

### Problema: Token não persiste

**Sintoma:** Usuário deslogado após reload

**Verificar:**
- [ ] Token está sendo salvo no localStorage?
- [ ] `validateToken()` está funcionando?
- [ ] Token não expirou?

**Debug:**
```typescript
console.log('Token:', localStorage.getItem('auth_token'));
```

### Problema: 401 Unauthorized

**Sintoma:** Requisições autenticadas falham

**Verificar:**
- [ ] Header Authorization está correto?
- [ ] Formato: `Bearer TOKEN`
- [ ] Token é válido?

**Debug:**
```typescript
console.log('Headers:', authService.getAuthHeader());
```

### Problema: Erro de Network

**Sintoma:** `TypeError: Failed to fetch`

**Verificar:**
- [ ] Backend está rodando?
- [ ] URL da API está correta?
- [ ] Firewall não está bloqueando?

## 📝 Ajustes Comuns

### Ajustar Interfaces TypeScript

Se sua API retorna dados diferentes, ajuste as interfaces:

**Arquivo: `src/services/auth.ts`**

```typescript
export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    // Adicione campos extras aqui
    avatar?: string;
    role?: string;
  };
}
```

### Ajustar Campos do Formulário

Se precisa de campos adicionais:

1. Adicionar no estado do componente
2. Adicionar input no JSX
3. Atualizar validação
4. Atualizar chamada da API

### Adicionar Interceptor de Requisições

Para tratar erros globalmente:

```typescript
// src/utils/api.ts
export async function apiRequest(url: string, options: RequestInit) {
  try {
    const response = await fetch(url, options);
    
    if (response.status === 401) {
      // Token inválido, deslogar
      authService.logout();
      window.location.href = '/login';
    }
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
```

## ✅ Checklist Final

Antes de fazer deploy em produção:

- [ ] Todas as variáveis de ambiente configuradas
- [ ] API URL aponta para produção
- [ ] HTTPS configurado
- [ ] Tokens são seguros
- [ ] Validações funcionando
- [ ] Mensagens de erro adequadas
- [ ] Loading states em todos os lugares
- [ ] Testado em múltiplos navegadores
- [ ] Testado em mobile
- [ ] Documentação atualizada

## 🚀 Deploy

### Frontend (Vercel/Netlify)

1. Fazer build: `npm run build`
2. Configurar variáveis de ambiente no host
3. Fazer deploy da pasta `dist/`

### Variáveis de Ambiente em Produção

```
VITE_API_URL=https://api.meusite.com/api
```

## 📞 Comandos Úteis

```bash
# Testar build local
npm run build && npm run preview

# Ver logs do servidor dev
npm run dev -- --debug

# Limpar cache
rm -rf node_modules/.vite
```

## 🎯 Dicas

1. **Use o DevTools Network**: Veja as requisições e respostas
2. **Console.log é seu amigo**: Debug com logs
3. **Teste um endpoint por vez**: Não teste tudo de uma vez
4. **Use Postman/Insomnia**: Teste a API antes de integrar
5. **Mantenha o backend atualizado**: Sincronize com a equipe

## 📚 Recursos Adicionais

- [Documentação do Fetch API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API)
- [JWT.io](https://jwt.io/) - Decoder de JWT
- [React Router Docs](https://reactrouter.com/)
- [Vite Env Variables](https://vitejs.dev/guide/env-and-mode.html)

---

**Boa sorte com a integração! 🚀**

Se encontrar problemas, revise este checklist e a documentação da API.

