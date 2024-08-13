import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  static email: string = '';
  static profileComplete: boolean;

  static getEmail(): string {
    if (this.email) {
      return this.email;
    }
    else {
      return "nope"
    }
  }

  static setEmail(email: string): void {
    this.email = email;
  }
}
