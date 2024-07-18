import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  static email: string = '';
  static profileComplete: boolean;
  static projectID: string = '';
  static lineItemID: string = '';

  static getEmail(): string {
    if (this.email.length) {
      return this.email;
    }
    else {
      return "no Email"
    }
  }

  static setEmail(email: string): void {
    this.email = email;
  }

  static getProjectId(): string {
    if (this.projectID.length) {
      return this.projectID;
    }
    else {
      return "no Project Id"
    }
  }

  static setProjectID(projectID: string): void {
    this.projectID = projectID;
  }

  static getLineItemId(): string {
    if (this.lineItemID.length) {
      return this.lineItemID;
    }
    else {
      return "no Project Id"
    }
  }

  static setLineItemId(lineItemID: string): void {
    this.lineItemID = lineItemID;
  }
}
