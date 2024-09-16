import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgSelectOption } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { CartService } from '../service/cart.service';
import { AuthService } from '../service/auth.service';
import { WishlistService } from '../service/wishlist.service';
import { GlobalService } from '../service/global.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterModule, NgStyle],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  products: any[] = [];
  showButtons: boolean[] = [];
  subscription: any;
  wishlist: any[] = [];
  wishlistLength: number = 0;
  productImage: string = '';
  loading: boolean = false;
  constructor(
    private _AuthService: AuthService,
    private _wishlistService: WishlistService,
    private _GlobalService: GlobalService,
    private _CartService: CartService
  ) {}
  loadWishlist() {
    this.loading = true;
    this.subscription = this._wishlistService.getUserWishlist().subscribe({
      next: (res) => {
        this.wishlist = res.data;
        this.wishlistLength = res.length;
        this.loading = false;
      },
      error: (err) => {},
    });
  }
  removeFromWishlist(itemId: string) {
    this.loading = true;
    this._wishlistService.removeProductFromWishlist(itemId).subscribe({
      next: (res) => {
        this.loadWishlist();
        this.loading = false;
      },
      error: (err) => {},
    });
  }
  ngOnInit(): void {
    this._AuthService.checkToken();
    this.productImage = this._GlobalService.productsImages;
    this.loadWishlist();
    this.showButtons = new Array(this.wishlistLength).fill(false);
  }
  addToCart(itemId: string) {
    this._CartService.addProductToCart(itemId).subscribe({
      next: (res) => {
        alert('product Added to cart');
      },
      error: (err) => {},
    });
  }
  toggleButton(index: number, state: boolean) {
    this.showButtons[index] = state;
  }
}
