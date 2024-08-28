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
  constructor(private cart: CartService) {}
  ngOnInit(): void {
    this.getCartItem();
  }
  getCartItem() {
    this.products = this.cart.cart;
    this.quantity = new Array(this.products.length).fill(1);
  }
  updateQuantity(event: Event, i: number) {
    const inputElement = event.target as HTMLInputElement;
    this.quantity[i] = parseInt(inputElement.value, 10);
  }
}
