import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../service/cart.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../service/global.service';
import { AuthService } from '../service/auth.service';
import { OrdersService } from '../service/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  subscription: any;
  cart: any = {};
  productsLength: number = 0;
  productImage: string = '';
  taxPrice: number = 100;
  couponError: string = '';
  loading: boolean = false;
  isModalVisible: boolean = false;

  couponForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });
  constructor(
    private _AuthService: AuthService,
    private _GlobalService: GlobalService,
    private _cartService: CartService,
    private _OrdersService: OrdersService,
    private _Router: Router
  ) {}

  loadCart() {
    this.subscription = this._cartService.getUserCart().subscribe({
      next: (res) => {
        this.cart = res.data;
        this.productsLength = res.length;
      },
      error: (err) => {},
    });
    console.log('cart', this.cart.cartItems);
  }

  removeItem(itemId: string) {
    this.loading = true;
    this._cartService.removeProductFromCart(itemId).subscribe({
      next: (res) => {
        this.loadCart();
        this.loading = false;
      },
      error: (err) => {},
    });
  }
  openModal() {
    this.isModalVisible = true;
  }
  closeModal() {
    this.isModalVisible = false;
  }
  clearCart() {
    this.isModalVisible = false;
    this.loading = true;
    this._cartService.clearCart().subscribe({
      next: (res) => {
        this.loading = false;
        this._Router.navigate(['/']);
      },
      error: (err) => {},
    });
  }

  createOrder() {
    this._OrdersService.createOrder().subscribe({
      next: (res) => {
        alert('order created');
        this._Router.navigate(['/myOrders']);
      },
      error: (err) => {},
    });
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.productImage = this._GlobalService.productsImages;
    this.loadCart();
    console.log('user', this._AuthService.currentUser);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
