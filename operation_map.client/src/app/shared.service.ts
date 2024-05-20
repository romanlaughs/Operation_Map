import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  static email: string | null = null;
  static profileComplete: boolean;

  static getEmail(): string | null {
    return this.email;
  }

  static setEmail(email: string): void {
    this.email = email;
  }
}
