import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //getAllProjects
  }

  addProject() {
      this.router.navigate(['/project-form']);
  }

}
