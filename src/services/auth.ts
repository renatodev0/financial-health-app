import { api } from './api';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth';

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  setAuthToken(token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  removeAuthToken() {
    delete api.defaults.headers.common['Authorization'];
  }
};
