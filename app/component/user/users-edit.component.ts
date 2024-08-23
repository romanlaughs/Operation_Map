import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { SharedService } from '../../shared.service';
import { User } from '../../shared/data/project/user';
import { ApiService } from '../../api.service';
import { FeathericonComponent } from '../../shared/component/feathericon/feathericon.component';

@Component({
  selector: 'app-users-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, FeathericonComponent],
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.scss',
})
export class UsersEditComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const email = SharedService.getEmail();
    if (email) {
      this.user.email = email;
    }
    this.apiService.getUserByEmail(this.user.email).subscribe((user: User) => {
      this.user.firstName = user.firstName;
      this.user.lastName = user.lastName;
    });
  }

  onSubmit() {
    var putUrl = `${this.apiUrl}/users/email/${this.user.email}`;
    this.http.put(putUrl, this.user).subscribe(
      (response) => {
        if (confirm('User information has been Updated!')) {
          this.router.navigate(['/users-edit']);
        } else {
          this.router.navigate(['/users-edit']);
        }
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }
}
