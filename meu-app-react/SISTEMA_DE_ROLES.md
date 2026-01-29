# 🎭 Sistema de Roles (Admin/User)

Este documento explica como funciona o sistema de roles implementado no projeto.

## 📋 Visão Geral

O sistema possui dois tipos de usuários:
- **Admin**: Acesso ao painel administrativo completo
- **User**: Acesso ao painel pessoal do usuário

Cada tipo de usuário vê uma página completamente diferente ao fazer login.

## 🎨 Páginas Criadas

### 1. AdminDashboard (Administrador)

**Características:**
- Layout com sidebar fixa
- Estatísticas gerais do sistema
- Tabela de usuários recentes
- Ações administrativas
- Design profissional e corporativo
- Cores: Azul e escuro

**Funcionalidades visíveis:**
- Total de usuários
- Usuários ativos
- Novos usuários
- Receita total
- Lista de usuários com ações (editar/deletar)
- Ações rápidas (adicionar usuário, gerar relatório, etc.)

### 2. UserDashboard (Usuário)

**Características:**
- Layout clean com navbar superior
- Informações pessoais do usuário
- Histórico de atividades
- Notificações
- Design moderno e amigável
- Cores: Roxo e gradiente

**Funcionalidades visíveis:**
- Informações do perfil
- Atividades recentes
- Ações rápidas (editar perfil, alterar senha, etc.)
- Notificações e alertas

## 🔧 Como Funciona

### Estrutura de Arquivos

```
src/
├── components/
│   ├── AdminDashboard.tsx       # Página do admin
│   ├── AdminDashboard.css       # Estilos do admin
│   ├── UserDashboard.tsx        # Página do usuário
│   ├── UserDashboard.css        # Estilos do usuário
│   ├── DashboardRouter.tsx      # Roteador de dashboards
│   ├── RoleSelector.tsx         # Seletor de role (demo)
│   └── RoleSelector.css         # Estilos do seletor
├── services/
│   └── auth.ts                  # Interface User com campo 'role'
└── contexts/
    └── AuthContext.tsx          # Contexto com suporte a roles
```

### Fluxo de Autenticação

1. **Login**: Usuário faz login
2. **Verificação**: Sistema verifica o role do usuário
3. **Roteamento**: `DashboardRouter` direciona para o dashboard correto
4. **Renderização**: Dashboard apropriado é exibido

## 🧪 Testando o Sistema

### Modo de Demonstração

O sistema está configurado em modo de demonstração. Para testar:

#### Opção 1: Email com "admin"

Faça login com qualquer email que contenha "admin":
- `admin@email.com` → Abre AdminDashboard
- `admin123@test.com` → Abre AdminDashboard

#### Opção 2: Email normal

Faça login com qualquer email SEM "admin":
- `user@email.com` → Abre UserDashboard
- `joao@test.com` → Abre UserDashboard

A senha pode ser qualquer coisa (é apenas demonstração).

### Seletor de Role

Na primeira vez que você fizer login, aparecerá um modal permitindo escolher o tipo de usuário. Você pode:
- Clicar em "Administrador" para ver o painel admin
- Clicar em "Usuário" para ver o painel user
- Clicar fora do modal para fechá-lo

## 🔐 Implementação em Produção

Quando integrar com uma API real, siga estes passos:

### 1. Atualizar o Backend

Certifique-se de que sua API retorna o campo `role` na resposta de autenticação:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "email": "admin@email.com",
    "name": "Admin User",
    "role": "admin"
  }
}
```

### 2. Remover Código de Demonstração

**Arquivo: `src/components/Login.tsx`**

Remover:
```typescript
// Define o role baseado no email (apenas para demonstração)
const role = formData.email.includes('admin') ? 'admin' : 'user';

// Simula dados do usuário
const userData = {
  id: '123',
  email: formData.email,
  name: formData.email.split('@')[0],
  role: role
};

// Salva no localStorage para simular
localStorage.setItem('auth_token', 'fake-token-' + Date.now());
localStorage.setItem('user_data', JSON.stringify(userData));

// Recarrega a página para aplicar o login
window.location.reload();
```

Substituir por:
```typescript
const response = await authService.login(formData);
console.log('Login bem-sucedido:', response.user);
// O authService já salva o token e os dados do usuário
window.location.href = '/dashboard'; // ou use react-router
```

### 3. Remover RoleSelector (opcional)

O componente `RoleSelector` é apenas para demonstração. Em produção, remova ou adapte:

**Arquivo: `src/App.tsx`**

Remover as linhas relacionadas a `showRoleSelector` e o componente `<RoleSelector />`.

## 🛡️ Proteção de Rotas por Role

Para proteger rotas específicas por role, atualize o `ProtectedRoute`:

```typescript
// src/components/ProtectedRoute.tsx
interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'user';
}

export default function ProtectedRoute({ 
  children, 
  requiredRole 
}: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Verifica se o role é necessário e se o usuário tem permissão
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div>
        <h1>Acesso Negado</h1>
        <p>Você não tem permissão para acessar esta página.</p>
      </div>
    );
  }

  return <>{children}</>;
}
```

### Uso com React Router

```typescript
<Routes>
  <Route path="/login" element={<Login />} />
  
  {/* Rota apenas para admins */}
  <Route 
    path="/admin/*" 
    element={
      <ProtectedRoute requiredRole="admin">
        <AdminDashboard />
      </ProtectedRoute>
    } 
  />
  
  {/* Rota apenas para usuários */}
  <Route 
    path="/dashboard" 
    element={
      <ProtectedRoute requiredRole="user">
        <UserDashboard />
      </ProtectedRoute>
    } 
  />
  
  {/* Rota dinâmica baseada em role */}
  <Route 
    path="/home" 
    element={
      <ProtectedRoute>
        <DashboardRouter />
      </ProtectedRoute>
    } 
  />
</Routes>
```

## 📊 Comparação das Páginas

| Característica | AdminDashboard | UserDashboard |
|----------------|----------------|---------------|
| **Layout** | Sidebar + Conteúdo | Navbar + Conteúdo |
| **Cores** | Azul/Escuro | Roxo/Gradiente |
| **Foco** | Gerenciamento | Informações pessoais |
| **Estatísticas** | Sistema completo | Atividades pessoais |
| **Tabelas** | Lista de usuários | Histórico pessoal |
| **Ações** | Admin (CRUD) | Pessoais (perfil) |

## 🎯 Funcionalidades Futuras

### Para Admin
- [ ] CRUD completo de usuários
- [ ] Gráficos e dashboards
- [ ] Relatórios exportáveis
- [ ] Logs do sistema
- [ ] Configurações globais

### Para User
- [ ] Edição de perfil real
- [ ] Upload de avatar
- [ ] Histórico completo
- [ ] Preferências pessoais
- [ ] Notificações em tempo real

## 🔄 Alternar entre Roles (Desenvolvimento)

Durante o desenvolvimento, você pode alternar manualmente:

### Via Console do Navegador

```javascript
// Mudar para admin
const user = JSON.parse(localStorage.getItem('user_data'));
user.role = 'admin';
localStorage.setItem('user_data', JSON.stringify(user));
location.reload();

// Mudar para user
const user = JSON.parse(localStorage.getItem('user_data'));
user.role = 'user';
localStorage.setItem('user_data', JSON.stringify(user));
location.reload();
```

### Criar Botão de Debug (Desenvolvimento)

Adicione temporariamente ao componente:

```typescript
{process.env.NODE_ENV === 'development' && (
  <button 
    onClick={() => {
      const user = JSON.parse(localStorage.getItem('user_data'));
      user.role = user.role === 'admin' ? 'user' : 'admin';
      localStorage.setItem('user_data', JSON.stringify(user));
      location.reload();
    }}
    style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      padding: '12px 20px',
      background: '#ef4444',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      zIndex: 9999
    }}
  >
    🔄 Alternar Role
  </button>
)}
```

## ✅ Checklist de Implementação

### Desenvolvimento
- [x] Criar AdminDashboard com estilos
- [x] Criar UserDashboard com estilos
- [x] Implementar DashboardRouter
- [x] Adicionar campo 'role' nas interfaces
- [x] Criar sistema de demonstração
- [x] Criar RoleSelector para testes

### Produção
- [ ] Integrar com API real
- [ ] Remover código de simulação
- [ ] Implementar proteção de rotas por role
- [ ] Adicionar validação de permissões no backend
- [ ] Implementar funcionalidades reais dos dashboards
- [ ] Adicionar testes para cada role
- [ ] Documentar permissões de cada role

## 📝 Notas Importantes

1. **Segurança**: A validação de roles DEVE acontecer no backend. O frontend apenas ajusta a UI.

2. **Tokens**: Em produção, use tokens JWT que incluam o role do usuário.

3. **Sincronização**: Sempre sincronize o role entre backend e frontend.

4. **Cache**: Limpe o cache do usuário ao fazer logout para evitar inconsistências.

5. **Rotas**: Proteja as rotas da API backend com middleware que valida o role.

## 🐛 Troubleshooting

### Problema: Dashboard errado após login
**Solução**: Limpe o localStorage e faça login novamente
```javascript
localStorage.clear();
location.reload();
```

### Problema: Modal de seleção não aparece
**Solução**: Limpe a flag do localStorage
```javascript
localStorage.removeItem('has_seen_role_selector');
location.reload();
```

### Problema: Role não está sendo salvo
**Solução**: Verifique se o localStorage aceita cookies/storage

---

**📌 Lembre-se**: Este sistema está em modo de demonstração. Para produção, integre com sua API e implemente validações adequadas no backend!

