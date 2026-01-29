// Configuração da URL da API (você pode adicionar isso em um arquivo .env)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
  };
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

/**
 * Serviço de autenticação
 */
class AuthService {
  /**
   * Realiza o login do usuário
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao fazer login');
      }

      const data = await response.json();
      
      // Salva o token no localStorage
      if (data.token) {
        this.setToken(data.token);
      }

      return data;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  /**
   * Realiza o cadastro de um novo usuário
   */
  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao fazer cadastro');
      }

      const data = await response.json();
      
      // Salva o token no localStorage
      if (data.token) {
        this.setToken(data.token);
      }

      return data;
    } catch (error) {
      console.error('Erro no cadastro:', error);
      throw error;
    }
  }

  /**
   * Faz logout do usuário
   */
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  }

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  /**
   * Salva o token de autenticação
   */
  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  /**
   * Retorna o token de autenticação
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Salva os dados do usuário
   */
  setUserData(user: AuthResponse['user']): void {
    localStorage.setItem('user_data', JSON.stringify(user));
  }

  /**
   * Retorna os dados do usuário
   */
  getUserData(): AuthResponse['user'] | null {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Retorna o header de autenticação para requisições
   */
  getAuthHeader(): { Authorization: string } | {} {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  /**
   * Verifica se o token ainda é válido
   */
  async validateToken(): Promise<boolean> {
    try {
      const token = this.getToken();
      if (!token) return false;

      const response = await fetch(`${API_URL}/auth/validate`, {
        method: 'GET',
        headers: {
          ...this.getAuthHeader(),
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Erro ao validar token:', error);
      return false;
    }
  }

  /**
   * Solicita recuperação de senha
   */
  async forgotPassword(email: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao solicitar recuperação de senha');
      }
    } catch (error) {
      console.error('Erro ao solicitar recuperação de senha:', error);
      throw error;
    }
  }

  /**
   * Reseta a senha do usuário
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password: newPassword }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao resetar senha');
      }
    } catch (error) {
      console.error('Erro ao resetar senha:', error);
      throw error;
    }
  }
}

// Export singleton instance
export default new AuthService();

