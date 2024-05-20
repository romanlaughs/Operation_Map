// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { SharedService } from '../shared.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  user: User = {
    firstName: '',
    lastName: '',
    email: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const email = SharedService.getEmail();
    if (email) {
      this.user.email = email;
    }
  }

  getLoggedInUserEmail(): string {
    // Replace this with the actual method to get the logged-in user's email
    return 'user@example.com';
  }

  onSubmit() {
    var postUrl = `${ this.apiUrl }/users`
    this.http.post(postUrl, this.user)
      .subscribe(response => {
        console.log('User created successfully', response);
        this.router.navigate(['/projects'])
      }, error => {
        console.error('There was an error!', error);
      });
  }
}
