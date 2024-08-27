import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: any[] = [];

  constructor() {
    this.loadCart();
  }

  // Method to add a product to the cart
  addToCart(product: any) {
    this.cart.push(product);
    this.saveCart();
  }

  // Method to get the current cart items
  getCart() {
    return this.cart;
  }

  // Save the cart to localStorage
  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  // Load the cart from localStorage
  loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  // Optional: Method to clear the cart
  clearCart() {
    this.cart = [];
    this.saveCart();
  }
}
