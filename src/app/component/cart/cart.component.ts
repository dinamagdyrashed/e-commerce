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
  products: any[] = [];
  constructor(private cart: CartService) {}
  ngOnInit(): void {
    this.getCartItem();
  }
  getCartItem() {
    this.products = this.cart.cart;
  }
}
