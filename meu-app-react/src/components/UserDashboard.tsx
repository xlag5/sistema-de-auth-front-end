import { useAuth } from '../contexts/AuthContext';
import './UserDashboard.css';

export default function UserDashboard() {
  const { user, logout } = useAuth();

  // Dados fictícios para demonstração
  const activities = [
    { id: 1, action: 'Login realizado', time: 'Há 2 minutos', icon: 'login' },
    { id: 2, action: 'Perfil atualizado', time: 'Há 1 hora', icon: 'edit' },
    { id: 3, action: 'Senha alterada', time: 'Há 2 dias', icon: 'lock' },
    { id: 4, action: 'Email verificado', time: 'Há 5 dias', icon: 'check' },
  ];

  const notifications = [
    { id: 1, title: 'Bem-vindo!', message: 'Sua conta foi criada com sucesso', time: '5 dias atrás' },
    { id: 2, title: 'Atualização', message: 'Novas funcionalidades disponíveis', time: '3 dias atrás' },
  ];

  return (
    <div className="user-dashboard">
      {/* Header */}
      <nav className="user-navbar">
        <div className="navbar-content">
          <div className="navbar-brand">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
            <h2>Meu Painel</h2>
          </div>
          <div className="navbar-actions">
            <button className="icon-button" title="Notificações">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span className="notification-badge">2</span>
            </button>
            <div className="user-menu">
              <div className="user-avatar-small">{user?.name.charAt(0).toUpperCase()}</div>
              <span className="user-name">{user?.name}</span>
            </div>
            <button onClick={logout} className="logout-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="user-main">
        <div className="user-container">
          {/* Welcome Card */}
          <div className="welcome-section">
            <div className="welcome-card">
              <div className="welcome-content">
                <h1>Olá, {user?.name}! 👋</h1>
                <p>Que bom ter você aqui. Confira as atualizações do seu painel.</p>
                <span className="user-role-badge">USUÁRIO</span>
              </div>
              <div className="welcome-avatar">
                <div className="large-avatar">{user?.name.charAt(0).toUpperCase()}</div>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="user-content-grid">
            {/* Left Column */}
            <div className="left-column">
              {/* Profile Card */}
              <div className="user-card">
                <div className="card-header">
                  <h3>Informações do Perfil</h3>
                  <button className="edit-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Editar
                  </button>
                </div>
                <div className="profile-info">
                  <div className="info-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <div>
                      <label>Nome</label>
                      <p>{user?.name}</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <div>
                      <label>Email</label>
                      <p>{user?.email}</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <div>
                      <label>ID do Usuário</label>
                      <p>{user?.id || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="user-card">
                <div className="card-header">
                  <h3>Atividades Recentes</h3>
                </div>
                <div className="activities-list">
                  {activities.map(activity => (
                    <div key={activity.id} className="activity-item">
                      <div className={`activity-icon ${activity.icon}`}>
                        {activity.icon === 'login' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                            <polyline points="10 17 15 12 10 7"></polyline>
                            <line x1="15" y1="12" x2="3" y2="12"></line>
                          </svg>
                        )}
                        {activity.icon === 'edit' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        )}
                        {activity.icon === 'lock' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                          </svg>
                        )}
                        {activity.icon === 'check' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </div>
                      <div className="activity-content">
                        <p className="activity-action">{activity.action}</p>
                        <span className="activity-time">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="right-column">
              {/* Quick Actions */}
              <div className="user-card">
                <div className="card-header">
                  <h3>Ações Rápidas</h3>
                </div>
                <div className="quick-actions">
                  <button className="action-card">
                    <div className="action-icon blue">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <span>Editar Perfil</span>
                  </button>
                  <button className="action-card">
                    <div className="action-icon green">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </div>
                    <span>Alterar Senha</span>
                  </button>
                  <button className="action-card">
                    <div className="action-icon purple">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                      </svg>
                    </div>
                    <span>Notificações</span>
                  </button>
                  <button className="action-card">
                    <div className="action-icon orange">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                      </svg>
                    </div>
                    <span>Configurações</span>
                  </button>
                </div>
              </div>

              {/* Notifications */}
              <div className="user-card">
                <div className="card-header">
                  <h3>Notificações</h3>
                  <span className="badge">{notifications.length}</span>
                </div>
                <div className="notifications-list">
                  {notifications.map(notif => (
                    <div key={notif.id} className="notification-item">
                      <div className="notification-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                      </div>
                      <div className="notification-content">
                        <h4>{notif.title}</h4>
                        <p>{notif.message}</p>
                        <span className="notification-time">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="view-all-btn">Ver todas as notificações</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

