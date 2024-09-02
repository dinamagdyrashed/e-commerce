import { NgClass, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { CartService } from '../service/cart.service';
import { FavouriteService } from '../service/favourite.service';
import { RouterModule } from '@angular/router';

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
  constructor(
    private service: ProductsService,
    private cart: CartService,
    private favourite: FavouriteService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.service.getProducts().subscribe((res) => {
      this.products = res;
      this.showButtons = new Array(this.products.length).fill(false);
      this.isFav = new Array(this.products.length).fill(false);
    });
  }

  addToCart(prod: any) {
    this.cart.addToCart(prod);
  }
  addToFav(prod: any, i: any) {
    this.favourite.addToFav(prod);
    console.log('favlist', this.favourite.favourite);
    this.isFav[i] = true;
  }

  toggleButton(index: number, state: boolean) {
    this.showButtons[index] = state;
  }
}
