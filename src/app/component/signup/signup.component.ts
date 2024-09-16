import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { passwordMatchValidator } from '../validators/password-match.validator';
import { NgClass } from '@angular/common';
import { Route, Router, RouterModule } from '@angular/router';
import { ProductsService } from '../service/products.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  signupForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
  });

  emailErrors: string = '';
  passwordErrors: string = '';
  phoneImage: string = '';

  signup(formData: FormGroup) {
    this._AuthService.singUp(formData.value).subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem('user', res.token);
          this._AuthService.saveCurrentUser();
        }
        this._Router.navigate(['/']);
      },
      error: (err) => {
        err.error.errors.map((error: any) => {
          if (error.path === 'email') this.emailErrors = error.msg;
          if (error.path === 'password') this.passwordErrors = error.msg;
        });
      },
    });
  }
}
