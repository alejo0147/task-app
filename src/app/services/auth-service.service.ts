import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  
  // Credenciales hardcodeadas
  private validCredentials = {
    username: 'admin',
    password: '1234'
  };

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === this.validCredentials.username && 
        password === this.validCredentials.password) {
      // Generamos el token que será validado por el backend
      const token = 'VALIDO-TOKEN-' + Date.now();
      this.setSession(token, username);
      return true;
    }
    return false;
  }

  private setSession(token: string, username: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
    sessionStorage.setItem(this.USER_KEY, username);
  }

  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  getUsername(): string | null {
    return sessionStorage.getItem(this.USER_KEY);
  }
}