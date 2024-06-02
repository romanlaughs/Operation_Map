// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { SharedService } from '../shared.service'
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profileupdate.component.html',
  styleUrls: ['./profileupdate.component.css']
})
export class ProfileUpdateComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  user: User = {
    firstName: '',
    lastName: '',
    email: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    const email = SharedService.getEmail();
    if (email) {
      this.user.email = email;
    }
    this.apiService.getUserByEmail(this.user.email).subscribe(
      (user: User) => {
        this.user.firstName = user.firstName;
        this.user.lastName = user.lastName;
      }
    )
  }

  onSubmit() {
    var putUrl = `${ this.apiUrl }/users/email/${this.user.email}`
    this.http.put(putUrl, this.user)
      .subscribe(response => {
        if (confirm("User information has been Updated!")) {
          this.router.navigate(['/projects'])
        }
        else {
          this.router.navigate(['/projects'])
        }
      }, error => {
        console.error('There was an error!', error);
      });
  }
}
