import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgClass],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isNavbarOpen = false;
  getMe: boolean = false;

  constructor(private getState: ProductsService) {}

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  ngOnInit(): void {
    this.getMe = this.getState.getMe;
    console.log(this.getMe);
    this.getState.loadState();
  }
}
