// services/authService.ts
import { AUTH_CONFIG } from '../config/auth.config';
import axios from 'axios';

export class AuthService {
  static async verifyToken(token: string) {
    return axios.post(`${AUTH_CONFIG.apiEndpoint}/users/verify-token`, { token });
  }

  static async googleLogin(idToken: string) {
    return axios.post(`${AUTH_CONFIG.apiEndpoint}/users/google-login`, { id_token: idToken });
  }
}