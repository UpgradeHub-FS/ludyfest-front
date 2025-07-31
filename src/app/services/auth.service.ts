import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  expire: number;
  rol?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  forceLogout() {
    throw new Error('Method not implemented.');
  }
  private readonly tokenKey = 'token';

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getPayload(): TokenPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<TokenPayload>(token);
    } catch (error) {
      console.error('Token inválido:', error);
      return null;
    }
  }

  isTokenExpired(): boolean {
    const payload = this.getPayload();
    if (!payload?.expire) return true;

    return payload.expire < Math.floor(Date.now() / 1000);
  }

  hasRole(role: string): boolean {
    const payload = this.getPayload();
    return payload?.rol === role;
  }

  isAuthenticated(): boolean {
    return !!this.getToken() && !this.isTokenExpired();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
