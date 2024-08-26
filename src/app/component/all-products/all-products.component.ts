import { NgClass, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
  providers: [ProductsService],
})
export class AllProductsComponent implements OnInit {
  products: any = [];
  showButtons: boolean[] = [];

  constructor(private service: ProductsService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.service.getProducts().subscribe((res) => {
      this.products = res;
      this.showButtons = new Array(this.products.length).fill(false);
    });
  }

  doThis() {
    console.log(this.products);
  }

  toggleButton(index: number, state: boolean) {
    this.showButtons[index] = state;
  }
}
