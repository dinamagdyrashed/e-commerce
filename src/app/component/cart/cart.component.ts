import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  quantity: number[] = [];
  products: any[] = [];
  subtotal: number = 0; // إضافة متغير للمجموع الفرعي

  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.getCartItem();
  }

  getCartItem() {
    this.products = this.cart.cart;
    this.quantity = new Array(this.products.length).fill(1);
    this.calculateSubtotal();
  }

  deleteProd(i: number) {
    this.cart.deleteProd(i);
    this.getCartItem();
  }

  updateQuantity(event: Event, i: number) {
    const inputElement = event.target as HTMLInputElement;
    this.quantity[i] = parseInt(inputElement.value, 10);
    this.calculateSubtotal();
  }

  calculateSubtotal() {
    this.subtotal = this.products.reduce((acc, prod, index) => {
      return acc + prod.price * this.quantity[index];
    }, 0);
  }
}
