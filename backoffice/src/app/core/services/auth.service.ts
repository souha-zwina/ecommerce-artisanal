import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  async loginWithEmail(email: string, password: string): Promise<void> {
    const cred = await signInWithEmailAndPassword(this.auth, email, password);
    const token = await cred.user.getIdToken();
    localStorage.setItem('admin_token', token);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('admin_token');
  }
}
