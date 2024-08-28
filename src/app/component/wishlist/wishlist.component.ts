import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FavouriteService } from '../service/favourite.service';
import { NgSelectOption } from '@angular/forms';
import { NgStyle } from '@angular/common';

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

  constructor(private favourite: FavouriteService) {}
  ngOnInit(): void {
    this.products = this.favourite.favourite;
    this.showButtons = new Array(this.products.length).fill(false);
  }
  toggleButton(index: number, state: boolean) {
    this.showButtons[index] = state;
  }
}
