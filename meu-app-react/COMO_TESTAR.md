# 🧪 Como Testar o Sistema de Roles

Guia rápido para testar as páginas de Admin e User.

## 🚀 Início Rápido

### 1. Certifique-se de que o servidor está rodando

```bash
cd meu-app-react
npm run dev
```

Acesse: `http://localhost:5173/`

### 2. Teste como ADMIN

**Na página de login:**
- Email: `admin@email.com` (ou qualquer email com "admin")
- Senha: `123456` (qualquer senha funciona)
- Clique em "Entrar"

**Você verá:**
- ✅ Painel administrativo com sidebar escura
- ✅ Estatísticas do sistema (usuários, receita, etc.)
- ✅ Tabela de usuários
- ✅ Menu lateral com opções administrativas
- ✅ Badge "ADMIN" no canto superior
- ✅ Design profissional em tons de azul e escuro

### 3. Teste como USUÁRIO

**Primeiro, faça logout:**
- Clique no botão vermelho "Sair" na sidebar

**Na página de login:**
- Email: `user@email.com` (ou qualquer email SEM "admin")
- Senha: `123456` (qualquer senha funciona)
- Clique em "Entrar"

**Você verá:**
- ✅ Painel pessoal com navbar superior
- ✅ Card de boas-vindas com gradiente roxo
- ✅ Informações do perfil
- ✅ Atividades recentes
- ✅ Notificações
- ✅ Badge "USUÁRIO" verde
- ✅ Design moderno e clean

## 📋 Exemplos de Emails para Teste

### Para ADMIN Dashboard:
- `admin@email.com`
- `admin123@test.com`
- `superadmin@site.com`
- `administrador@empresa.com`

### Para USER Dashboard:
- `user@email.com`
- `joao@test.com`
- `maria@site.com`
- `cliente@empresa.com`

## 🎭 Modal de Seleção de Role

Na primeira vez que você fizer login, verá um modal bonito permitindo escolher o tipo de usuário. Isso é apenas para demonstração!

**Para ver o modal novamente:**
1. Abra o console do navegador (F12)
2. Digite: `localStorage.removeItem('has_seen_role_selector')`
3. Recarregue a página (F5)

## 🔄 Alternar entre Admin e User

### Método 1: Fazer Logout e Login Novamente

1. Clique em "Sair"
2. Faça login com email diferente

### Método 2: Via Console (Rápido)

**Abra o console do navegador (F12) e cole:**

Para virar ADMIN:
```javascript
const user = JSON.parse(localStorage.getItem('user_data'));
user.role = 'admin';
localStorage.setItem('user_data', JSON.stringify(user));
location.reload();
```

Para virar USER:
```javascript
const user = JSON.parse(localStorage.getItem('user_data'));
user.role = 'user';
localStorage.setItem('user_data', JSON.stringify(user));
location.reload();
```

## ✨ O que Testar

### No AdminDashboard
- [ ] Sidebar fixa está visível
- [ ] 4 cards de estatísticas aparecem
- [ ] Tabela de usuários está visível
- [ ] Botões de ação (editar/deletar) aparecem
- [ ] Seção de ações rápidas funciona
- [ ] Botão de logout está na sidebar
- [ ] Badge "ADMIN" aparece
- [ ] Design é profissional e corporativo

### No UserDashboard
- [ ] Navbar superior está visível
- [ ] Card de boas-vindas com gradiente aparece
- [ ] Avatar grande com inicial do nome
- [ ] Informações do perfil estão corretas
- [ ] Lista de atividades recentes
- [ ] Cards de ações rápidas (4 itens)
- [ ] Notificações aparecem
- [ ] Badge "USUÁRIO" aparece
- [ ] Design é moderno e clean

## 📱 Teste Responsivo

### Desktop (> 1024px)
- Todos os elementos visíveis
- Grid funciona perfeitamente

### Tablet (768px - 1024px)
- Layout se ajusta
- Sidebar do admin fica menor (se admin)
- Grid de cards se adapta

### Mobile (< 768px)
- Sidebar do admin some (se admin)
- Conteúdo em coluna única
- Cards empilhados
- Botões full-width

**Para testar:**
1. Pressione F12 (DevTools)
2. Clique no ícone de dispositivo móvel
3. Teste diferentes tamanhos

## 🎨 Diferenças Visuais

| Aspecto | Admin | User |
|---------|-------|------|
| **Layout** | Sidebar + Conteúdo | Navbar + Conteúdo |
| **Cor Principal** | Azul (#3b82f6) | Roxo (#667eea) |
| **Fundo** | Cinza claro | Gradiente roxo |
| **Badge** | ADMIN (azul) | USUÁRIO (verde) |
| **Avatar** | 48px | 100px na welcome |
| **Navegação** | Lateral | Superior |
| **Tabelas** | Sim | Não |
| **Stats** | 4 cards grandes | Atividades |

## 🐛 Problemas Comuns

### "Não consigo fazer login"
**Solução**: Qualquer email e senha funcionam! É apenas demonstração.

### "A página não muda quando faço login"
**Solução**: Aguarde o loading e recarregue se necessário.

### "Estou vendo o dashboard errado"
**Solução**: Verifique o email usado:
- Com "admin" → AdminDashboard
- Sem "admin" → UserDashboard

### "O modal não fecha"
**Solução**: Clique fora do modal ou pressione ESC.

### "Mudei o role mas nada aconteceu"
**Solução**: Você precisa recarregar a página (F5).

## 🎯 Casos de Teste

### Teste 1: Login como Admin
1. ✅ Abrir http://localhost:5173/
2. ✅ Inserir: admin@test.com / 123456
3. ✅ Clicar em "Entrar"
4. ✅ Verificar que AdminDashboard aparece
5. ✅ Verificar sidebar escura
6. ✅ Verificar estatísticas

### Teste 2: Login como User
1. ✅ Fazer logout
2. ✅ Inserir: user@test.com / 123456
3. ✅ Clicar em "Entrar"
4. ✅ Verificar que UserDashboard aparece
5. ✅ Verificar navbar superior
6. ✅ Verificar card de boas-vindas

### Teste 3: Alternância de Roles
1. ✅ Login como admin
2. ✅ Verificar AdminDashboard
3. ✅ Fazer logout
4. ✅ Login como user
5. ✅ Verificar UserDashboard

### Teste 4: Persistência
1. ✅ Fazer login
2. ✅ Recarregar página (F5)
3. ✅ Verificar que continua logado
4. ✅ Verificar que o dashboard correto aparece

### Teste 5: Responsividade
1. ✅ Abrir DevTools (F12)
2. ✅ Ativar modo mobile
3. ✅ Testar diferentes tamanhos
4. ✅ Verificar que layout se adapta

## 📸 Screenshots Esperados

### AdminDashboard
```
+------------------+-------------------------------------------+
| [Logo]           | Painel Administrativo        [ADMIN] [A] |
| Admin Panel      | Bem-vindo de volta, Admin                 |
|                  |                                           |
| 🏠 Dashboard     | +--------+  +--------+  +--------+       |
| 👥 Usuários      | | 1,247  |  |  892   |  |   45   |       |
| 💰 Financeiro    | | Users  |  | Active |  |  New   |       |
| 📊 Relatórios    | +--------+  +--------+  +--------+       |
| ⚙️  Configurações|                                           |
|                  | Usuários Recentes                         |
| [Sair]           | +-----------------------------------+     |
+------------------+ | ID | Nome | Email | Status | Ações |   |
                     +-----------------------------------+     |
```

### UserDashboard
```
+----------------------------------------------------------+
| [Logo] Meu Painel              [🔔] [Avatar] [Logout]    |
+----------------------------------------------------------+
|                                                           |
|  +----------------------------------------------------+   |
|  | Olá, User! 👋                          [Avatar]    |   |
|  | Que bom ter você aqui.                 [  100px ] |   |
|  | [USUÁRIO]                                          |   |
|  +----------------------------------------------------+   |
|                                                           |
|  +-----------------------+  +--------------------------+  |
|  | Informações do Perfil |  | Ações Rápidas            | |
|  | 📧 user@email.com     |  | [Editar] [Senha]         | |
|  | 🆔 123                |  | [Notif]  [Config]        | |
|  +-----------------------+  +--------------------------+  |
```

## 💡 Dicas

1. **Use diferentes abas** do navegador para ver Admin e User simultaneamente
2. **Abra o DevTools** para ver os dados salvos no localStorage
3. **Teste no mobile** para ver a responsividade
4. **Tire screenshots** para comparar os dois dashboards
5. **Experimente todas as cores** e animações hover

## 🎓 Para Apresentar

Se você vai apresentar este projeto:

1. **Comece mostrando o login** elegante
2. **Faça login como admin** e mostre as funcionalidades administrativas
3. **Faça logout e login como user** para mostrar a diferença
4. **Mostre o modal de seleção** de role
5. **Teste a responsividade** no mobile
6. **Explique que é demonstração** e que em produção vem da API

## ⚡ Comandos Rápidos

```bash
# Limpar tudo e começar do zero
localStorage.clear();
location.reload();

# Ver dados salvos
console.log('Token:', localStorage.getItem('auth_token'));
console.log('User:', JSON.parse(localStorage.getItem('user_data')));

# Forçar logout
localStorage.clear();
location.href = '/';
```

---

**🎉 Divirta-se testando!** Se encontrar algum problema, verifique o console do navegador para mensagens de erro.

