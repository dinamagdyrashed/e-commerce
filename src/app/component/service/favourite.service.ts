import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  favourite: any[] = [];

  constructor() {
    this.loadFav();
  }

  addToFav(product: any) {
    this.favourite.push(product);
    this.saveFav();
  }

  saveFav() {
    localStorage.setItem('favourite', JSON.stringify(this.favourite));
  }

  loadFav() {
    const savedFav = localStorage.getItem('favourite');
    if (savedFav) {
      this.favourite = JSON.parse(savedFav);
    }
  }

  clearFav() {
    this.favourite = [];
    this.saveFav();
  }
}
