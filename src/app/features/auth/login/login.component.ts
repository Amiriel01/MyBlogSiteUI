import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../Services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model: LoginRequest;
  errorMessage: string;

  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) {
    this.model = {
      email: '',
      password: '',
    };
    this.errorMessage = '';
  }

  onFormSubmit(): void {
    this.authService.login(this.model)
    .subscribe({
      next: (response) => {
        //set auth cookie
        this.cookieService.set('Authorization', `Bearer ${response.token}`, undefined, '/', undefined, true, 'Strict');

        //set user in local storage 
        this.authService.setUser({
          email: response.email,
          roles: response.roles,
        });
        
        //redirect to homepage
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        this.errorMessage = 'Incorrect email or password. Please try again.';
      }
    });
  }
}
