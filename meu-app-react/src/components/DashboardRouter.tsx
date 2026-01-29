import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

/**
 * Componente que redireciona para o dashboard correto baseado no role do usuário
 */
export default function DashboardRouter() {
  const { user } = useAuth();

  // Se não tiver usuário, não renderiza nada (o ProtectedRoute vai lidar com isso)
  if (!user) {
    return null;
  }

  // Renderiza o dashboard baseado no role
  if (user.role === 'admin') {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
}

