import { computed, inject, Injectable, signal } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, User, UserCredential } from '@angular/fire/auth';
import { AsyncHandler } from './shared/asyncHandler/asyncHandler.decorator';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);

  private _user = signal<User | null>(null);
  user = computed(() => this._user());

  private _loading = signal<boolean>(true);
  loading = computed(() => this._loading());
  
  constructor() {
    this.auth.onAuthStateChanged((user) => {
      this._user.set(user);
      this._loading.set(false);
    });
  }

  @AsyncHandler({errorMessage: 'Failed to login', successMessage: 'Login successful'}) 
  async loginWithGoogle(): Promise<UserCredential | undefined> {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  @AsyncHandler({errorMessage: 'Failed to logout', successMessage: 'Logout successful'})
  logout() {
    return signOut(this.auth);
  }
}
