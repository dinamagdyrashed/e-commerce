import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { AllProductsComponent } from '../all-products/all-products.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AllProductsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ProductsService],
})
export class HomeComponent implements OnInit {
  categories: any;
  constructor(private service: ProductsService) {}
  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories() {
    return this.service
      .getCategories()
      .subscribe((res) => (this.categories = res));
  }
}
