import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './RoleSelector.css';

/**
 * Componente de simulação para testar diferentes roles
 * REMOVER em produção - apenas para demonstração
 */
export default function RoleSelector() {
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'admin' | 'user'>(user?.role || 'user');

  const handleRoleChange = (role: 'admin' | 'user') => {
    setSelectedRole(role);
    // Simula mudança de role no localStorage
    const userData = localStorage.getItem('user_data');
    if (userData) {
      const user = JSON.parse(userData);
      user.role = role;
      localStorage.setItem('user_data', JSON.stringify(user));
    }
    // Recarrega a página para aplicar mudanças
    window.location.reload();
  };

  return (
    <div className="role-selector-overlay">
      <div className="role-selector-modal">
        <div className="modal-header">
          <h2>🎭 Modo de Demonstração</h2>
          <p>Escolha um tipo de usuário para visualizar</p>
        </div>

        <div className="role-options">
          <button
            className={`role-option ${selectedRole === 'admin' ? 'selected' : ''}`}
            onClick={() => handleRoleChange('admin')}
          >
            <div className="role-icon admin">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <h3>Administrador</h3>
            <p>Acesso completo ao painel administrativo</p>
            <ul>
              <li>Gerenciamento de usuários</li>
              <li>Estatísticas e relatórios</li>
              <li>Configurações avançadas</li>
            </ul>
          </button>

          <button
            className={`role-option ${selectedRole === 'user' ? 'selected' : ''}`}
            onClick={() => handleRoleChange('user')}
          >
            <div className="role-icon user">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h3>Usuário</h3>
            <p>Acesso ao painel pessoal do usuário</p>
            <ul>
              <li>Perfil e informações pessoais</li>
              <li>Histórico de atividades</li>
              <li>Notificações e alertas</li>
            </ul>
          </button>
        </div>

        <div className="modal-footer">
          <p className="demo-note">
            ⚠️ Este é um modo de demonstração. Em produção, o role será definido pelo backend.
          </p>
        </div>
      </div>
    </div>
  );
}

