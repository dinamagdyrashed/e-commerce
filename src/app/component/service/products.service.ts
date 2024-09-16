import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fakeApi } from '../../app.config';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  getMe: boolean = false;
  private hostName: string = '';
  private routeName: string = '';
  productImages: string = '';
  constructor(public http: HttpClient, private _GlobalService: GlobalService) {
    this.hostName = this._GlobalService.hostName;
    this.routeName = this._GlobalService.productsRoute;
    this.productImages = this._GlobalService.productsImages;
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

  getProducts(
    limit: number = 16,
    page: number = 1,
    sort: string = '-createdAt',
    search: string
  ): Observable<any> {
    return this.http.get(
      `${this.hostName}${this.routeName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`
    );
  }

  getCategories() {
    return this.http.get(fakeApi + '/products/categories');
  }

  getSpecificProducts(id: number) {
    return this.http.get(fakeApi + '/products/' + id);
  }
}
