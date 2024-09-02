import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
interface ILoginTDO {
  email: string;
  password: string;
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgClass, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginTDO: ILoginTDO = {
    email: '',
    password: '',
  };
  onSubmit(loginForm: any) {
    if (loginForm.valid) {
      console.log('Form Submitted!', loginForm.value);
    }
  }
}
