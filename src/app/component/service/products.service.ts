import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fakeApi } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  getMe: boolean = false;

  constructor(public http: HttpClient) {
    this.loadState();
  }

  loadState() {
    const savedGetMe = localStorage.getItem('getMe');
    if (savedGetMe) {
      this.getMe = JSON.parse(savedGetMe);
    }
  }

  saveState() {
    localStorage.setItem('getMe', JSON.stringify(this.getMe));
  }

  updateState(value: boolean) {
    this.getMe = value;
    this.saveState();
  }

  getProducts() {
    return this.http.get(fakeApi + '/products');
  }

  getCategories() {
    return this.http.get(fakeApi + '/products/categories');
  }

  getSpecificProducts(id: number) {
    return this.http.get(fakeApi + '/products/' + id);
  }
}
