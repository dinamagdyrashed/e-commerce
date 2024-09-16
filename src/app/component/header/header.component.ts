import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductsService } from '../service/products.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgClass],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isNavbarOpen = false;

  isLogin: boolean = false;
  constructor(private _AuthService: AuthService, private _Router: Router) {
    console.log('token', _AuthService.currentUser.getValue());
    _AuthService.currentUser.subscribe(() => {
      if (_AuthService.currentUser.getValue() !== null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }
  logout() {
    this._AuthService.logout();
    this._Router.navigate(['/']);
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }
}
