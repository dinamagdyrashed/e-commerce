import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../service/products.service';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyPipe, NgClass, NgFor } from '@angular/common';
import { StarRatingModule } from 'angular-star-rating';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [HttpClientModule, CurrencyPipe, NgClass, StarRatingModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  providers: [ProductsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDetailsComponent implements OnInit {
  productId: number = 0;
  product: any;

  constructor(
    private route: ActivatedRoute,
    private service: ProductsService,
    private cart: CartService
  ) {}
  getProduct() {
    this.service
      .getSpecificProducts(this.productId)
      .subscribe((res) => ((this.product = res), console.log(this.product)));
  }
  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.getProduct();
    console.log(this.product);
  }

  addToCart(prod: any) {
    this.cart.addToCart(prod);
  }
}
