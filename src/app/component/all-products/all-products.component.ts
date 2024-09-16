import { NgClass, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { CartService } from '../service/cart.service';
import { RouterModule } from '@angular/router';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { WishlistService } from '../service/wishlist.service';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [NgClass, NgStyle, RouterModule],
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
  providers: [ProductsService],
})
export class AllProductsComponent implements OnInit {
  products: any = [];
  showButtons: boolean[] = [];
  isFav: boolean[] = [];
  imgDomain: string = '';
  search: string = '';
  isModalVisible: boolean = false;
  isModalError: boolean = false;
  successMessage: string = '';

  page: number = 1;
  constructor(
    private service: ProductsService,
    private _CartService: CartService,
    private wishlist: WishlistService
  ) {}

  ngOnInit(): void {
    this.imgDomain = this.service.productImages;
    this.getAllProducts();
  }

  getAllProducts() {
    this.service
      .getProducts(16, this.page, undefined, this.search)
      .subscribe((res) => {
        this.products = res.data;
        this.showButtons = new Array(this.products.length).fill(false);
        this.isFav = new Array(this.products.length).fill(false);
      });
  }
  closeError() {
    this.isModalError = false;
  }
  addToCart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe({
      next: (res) => {
        this.successMessage = 'Product added to cart successfully!';
        this.isModalVisible = true;
        setTimeout(() => {
          this.isModalVisible = false;
        }, 3000);
      },
      error: (err) => {
        console.log('Error adding product to cart.', err);
        this.isModalError = true;
      },
    });
  }

  addToFav(productId: string, i: number) {
    this.wishlist.addProductToWishlist(productId).subscribe({});

    this.isFav[i] = true;
  }

  toggleButton(index: number, state: boolean) {
    this.showButtons[index] = state;
  }
}
