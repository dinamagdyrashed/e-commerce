import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: any[] = [];

  constructor() {
    this.loadCart();
  }

  addToCart(product: any) {
    this.cart.push(product);
    this.saveCart();
  }

  getCart() {
    return this.cart;
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }
}
