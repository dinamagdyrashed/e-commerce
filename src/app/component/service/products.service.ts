import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fakeApi } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(public http: HttpClient) {}
  getProducts() {
    return this.http.get(fakeApi + '/products');
  }
  getCategories() {
    return this.http.get(fakeApi + '/products/categories');
  }
}
