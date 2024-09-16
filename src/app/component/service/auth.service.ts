import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Login, Signup } from '../interface/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  hostName: string = '';
  routeName: string = '';
  constructor(
    private http: HttpClient,
    private router: Router,
    private globalService: GlobalService
  ) {
    this.hostName = this.globalService.hostName;
    this.routeName = this.globalService.authRoute;
    if (localStorage.getItem('user') !== null) {
      this.saveCurrentUser();
    }
  }
  currentUser = new BehaviorSubject(null);
  authPhoto: string = 'images/phone.svg';
  saveCurrentUser() {
    const token: any = localStorage.getItem('user');
    console.log('Tokenmmm:', token);

    this.currentUser.next(jwtDecode(token));
  }
  checkToken() {
    const token: any = localStorage.getItem('user');
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp! < Date.now() / 1000) {
      this.logout();
      this.router.navigate(['/']);
    }
  }

  singUp(formData: Signup): Observable<any> {
    return this.http.post(`${this.hostName}${this.routeName}/signup`, formData);
  }

  login(formData: Login): Observable<any> {
    return this.http.post(`${this.hostName}${this.routeName}/login`, formData);
  }

  sendMail(formData: Login): Observable<any> {
    return this.http.post(
      `${this.hostName}${this.routeName}/forgetPassword`,
      formData
    );
  }

  verifyCode(formData: Login): Observable<any> {
    return this.http.post(
      `${this.hostName}${this.routeName}/verifyCode`,
      formData,
      { headers: { authorization: `Bearer ${localStorage.getItem('verify')}` } }
    );
  }

  resetPassword(formData: Login): Observable<any> {
    return this.http.put(
      `${this.hostName}${this.routeName}/resetCode`,
      formData,
      { headers: { authorization: `Bearer ${localStorage.getItem('verify')}` } }
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.next(null);
  }
}
