import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
    private userService: UsersService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.userService.isUserBasicAuth(email, password).subscribe(
        (success) => {
          if (success) {
            console.log('Login successful');
            console.log(success);
            localStorage.setItem('userId', success.userId);
            localStorage.setItem('authToken', btoa(`${email}:${password}`)); 
            this.router.navigate(['/providers']);
          } else {
            console.error('Login failed');
          }
        },
        (error) => {
          console.error('Error during login:', error);
        }
      );
    }
  }
}
