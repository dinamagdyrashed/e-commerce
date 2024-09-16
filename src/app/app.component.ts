import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './component/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './component/footer/footer.component';
import { ProductsService } from './component/service/products.service';
import { AuthService } from './component/service/auth.service';
import { GlobalService } from './component/service/global.service';
import { CartService } from './component/service/cart.service';
import { OrdersService } from './component/service/order.service';
import { WishlistService } from './component/service/wishlist.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SharedModule,
    HeaderComponent,
    HttpClientModule,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    ProductsService,
    AuthService,
    GlobalService,
    CartService,
    OrdersService,
    WishlistService,
  ],
})
export class AppComponent {
  title = 'e-commerce';
}
